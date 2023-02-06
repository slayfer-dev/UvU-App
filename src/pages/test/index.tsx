import { useState } from "react";

export default function Test() {
  const [question, setQuestion] = useState("");
  const [companyData, setCompanyData] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async (question: string, companyData: string) => {
    setLoading(true);
    const res = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, companyData }),
    });

    const data = await res.json();
    console.log("🚀 ~ file: index.tsx:20 ~ handleClick ~ data", data);
    setOutput(data.summary);
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center m-2 ">
      <div className="flex flex-col w-full lg:w-1/2">
        <h1 className="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-700">
          Company info answer bot
        </h1>
        <h2>Company Data</h2>
        <textarea
          className="w-full h-64 mb-10 text-sm p-4  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Paste article here"
          value={companyData}
          onChange={(v) => setCompanyData(v.target.value)}
        />
        <h2>Question</h2>
        <textarea
          className="w-full h-64 text-sm p-4  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Paste article here"
          value={question}
          onChange={(v) => setQuestion(v.target.value)}
        />
        <button
          onClick={() => handleClick(question, companyData)}
          className="m-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          {loading ? "loading..." : "Send question"}
        </button>
        {output ? `Answer: ${output}` : null}
      </div>
    </div>
  );
}
