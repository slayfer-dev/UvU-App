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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { question, companyData } = req.body;

    const inputs = ["Tengo incertidumbre sobre mi futuro", "Me siento bien"];

    const examples = [
      {
        label: "Positive",
        text: "Me siento bien",
      },
      {
        label: "Positive",
        text: "Tuve un buen dia",
      },
      {
        label: "Positive",
        text: "Estoy feliz",
      },
      {
        label: "Positive",
        text: "Creo que estoy progesando",
      },
      {
        label: "Neutral",
        text: "No se como me siento",
      },
      {
        label: "Neutral",
        text: "No se que decir",
      },
      {
        label: "Neutral",
        text: "No tengo nada que decir",
      },
      {
        label: "Neutral",
        text: "No estoy seguro",
      },
      {
        label: "Neutral",
        text: "No entiendo nada",
      },
      {
        label: "Negative",
        text: "Estoy triste",
      },
      {
        label: "Negative",
        text: "Estoy deprimido",
      },
      {
        label: "Negative",
        text: "Me siento mal",
      },
      {
        label: "Negative",
        text: "Creo que estoy decayendo",
      },
      {
        label: "Negative",
        text: "Me estoy preocupando",
      },
    ];

    const response2 = await cohere
      .classify({
        model: "large",
        inputs,
        examples: examples,
      })
      .then((response) => {
        console.log(response.body);
      });

    const response = await cohere.generate({
      model: "xlarge",
      prompt: `Data:${companyData}\nQuestion: ${question}?\nAnswer:`,
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
