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

let dataIn: { category: string; input: string }[] = [];
let dataOut: { category: string; input: string; output: string }[] = [];

const populateData = async () => {
  return fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS_YApcplKoBDVQiiSAU9CYpnNks0QD5IPmBhlw5t_QdQmywB5o2T8HjuxJAvM6RvKtNBCWdDBvBuir/pub?output=tsv"
  )
    .then((res) => res.text())
    .then((res) => {
      const matrixData = res
        .replace(/[-\r]/g, "")
        .split("\n")
        .map((el) => el.split("\t").map((data) => data.trim()))
        .slice(1);

      const formatDataIn = matrixData
        .filter((el) => {
          const [input] = el;
          return Boolean(input);
        })
        .map((el) => {
          const [category, input] = el;
          return {
            category,
            input,
          };
        });

      const formatDataOut = matrixData
        .filter((el) => {
          const [, , output] = el;
          return Boolean(output);
        })
        .map((el) => {
          const [category, input, output] = el;
          return {
            category,
            output,
            input,
          };
        });

      return { formatDataIn, formatDataOut };
    });
};

const onInitPopulateData = async () => {
  const { formatDataIn, formatDataOut } = await populateData();

  dataIn = formatDataIn;
  dataOut = formatDataOut;
};

setInterval(onInitPopulateData, 1000 * 60 * 60 * 24);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { formatDataIn, formatDataOut } =
      dataIn.length && dataOut.length
        ? { formatDataIn: dataIn, formatDataOut: dataOut }
        : await populateData();

    const { message } = req.body;

    const inputs = [message];

    const trainData = [
      ...formatDataIn.map((el) => {
        const { category, input } = el;
        return {
          label: category,
          text: input,
        };
      }),
    ];

    const feeling = await cohere
      .classify({
        model: "large",
        inputs,
        examples: trainData,
      })
      .then((response) => {
        const {
          classifications: [{ prediction, confidence }],
        } = response.body;
        if (confidence > 0.5) {
          return prediction;
        }
        return "No se";
      });

    const purpouse =
      `Generar mensajes que puedan ayudar a las personas a sentirse mejor\n\n` +
      `Sentimiento: No se\n` +
      `Mensaje: ${inputs[0]}\n` +
      `Respuesta: Cuentame mas que te estoy acompañando.\n\n--\n` +
      `Sentimiento: No se\n` +
      `Mensaje: ${inputs[0]}\n` +
      `Respuesta: Es algo confuso para mi, pero aqui estoy para ti.\n\n--\n` +
      `Sentimiento: No se\n` +
      `Mensaje: ${inputs[0]}\n` +
      `Respuesta: Quizas me sea dificil entender como te sientes, pero te estare apoyando.\n\n--\n`;

    const promtData = formatDataOut
      .filter((el) => el.category === feeling)
      .map((el) => {
        const { input, output } = el;
        return `Sentimiento: ${feeling}\nMensaje: ${input}\nRespuesta: ${output}\n\n`;
      })
      .join("--\n");

    const response = await cohere.generate({
      model: "xlarge",
      prompt: `${purpouse}\n\n${promtData}\n\n--Sentimiento: ${feeling}\nMensaje: ${inputs[0]}\nRespuesta:`,
      max_tokens: 100,
      temperature: 0.6,
      k: 0,
      p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: ["--"],
      return_likelihoods: "NONE",
    });

    res
      .status(200)
      .json({ summary: response.body.generations[0].text.slice(0, -3) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ summary: "Error" });
  }
}
