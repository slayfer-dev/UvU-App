import cohere from "cohere-ai";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  summary: string;
};

const COHERE_API_KEY = process.env.COHERE_API_KEY;

if (!COHERE_API_KEY) {
  throw new Error("COHERE_API_KEY is not defined");
}

cohere.init(COHERE_API_KEY);

let dataLoaded: { category: string; input: string; output: string }[] = [];

const populateData = async () => {
  return fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS_YApcplKoBDVQiiSAU9CYpnNks0QD5IPmBhlw5t_QdQmywB5o2T8HjuxJAvM6RvKtNBCWdDBvBuir/pub?output=tsv"
  )
    .then((res) => res.text())
    .then((res) => {
      const matrixData = res
        .replace(/[-\r.]/g, "")
        .split("\n")
        .map((el) =>
          el.split("\t").map((data) => `${data.replace(/\.$/g, "").trim()}.`)
        )
        .slice(1);

      const formatData = matrixData
        .filter((el) => {
          const [category, input, output] = el;
          return Boolean(output) && Boolean(category) && Boolean(input);
        })
        .map((el) => {
          const [category, input, output] = el;
          return {
            category,
            output,
            input,
          };
        });

      return { formatData };
    });
};

const onInitPopulateData = async () => {
  const { formatData } = await populateData();

  dataLoaded = formatData;
};

onInitPopulateData();

setInterval(onInitPopulateData, 1000 * 60 * 60 * 24);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.time("Populate data");

    const { formatData } = dataLoaded.length
      ? { formatData: dataLoaded }
      : await populateData();

    console.timeEnd("Populate data");

    const { message } = req.body;

    const inputs = [message];

    console.time("Train data");

    const trainData = [
      ...formatData
        .map((el) => {
          const { category, input } = el;
          return {
            label: category,
            text: input,
          };
        })
        .filter(
          (el, _, arr) =>
            arr.find((item) => item.label === el.label)?.text !==
            arr.reverse().find((item) => item.label === el.label)?.text
        ),
    ];

    console.timeEnd("Train data");

    console.time("Classify feeling");

    const feeling = await cohere
      .classify({
        model: "small",
        inputs,
        examples: trainData,
      })
      .then((response) => {
        const {
          classifications: [{ prediction, confidence }],
        } = response.body;
        if (confidence >= 0.25 && confidence < 0.4)
          return { prediction: "Neutro / Apertura", confidence };

        if (confidence >= 0.5) return { prediction, confidence };

        return { prediction: "No se", confidence };
      });

    console.timeEnd("Classify feeling");

    const purpouse = `Generar mensajes que puedan ayudar a las personas a sentirse mejor y acompa??adas, diciendo cosas como, te leo, estoy aqui para ti y similares.`;

    console.time("Create prompt data");

    const promtData = formatData
      .filter(
        (el) =>
          el.category
            .toLocaleLowerCase()
            .includes(feeling.prediction.toLocaleLowerCase()) ||
          el.category === "No se"
      )
      .map((el) => `Sentimientos: ${el.category}\nMensaje: ${el.output}`)
      .join("\n--\n");

    console.timeEnd("Create prompt data");

    console.time("Generate message");

    const response = await cohere.generate({
      model: "xlarge",
      prompt: `${purpouse}\n--\n${promtData}\n--\nSentimientos: ${feeling.prediction}\nMensaje:`,
      max_tokens: 180,
      temperature: 0.8,
      k: 60,
      p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: ["--"],
      return_likelihoods: "NONE",
    });

    console.timeEnd("Generate message");

    res.status(200).json({
      summary: response.body.generations[0].text.slice(0, -3).split(".")[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ summary: "Error" });
  }
}
