import dotenv from "dotenv";

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function getModelResponse(messages) {
  try {
    console.log("calling open router api");
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-8b-instruct:free",
          // messages: [
          //   {
          //     role: "user",
          //     content:
          //       "You are a helpful health assistant. Keep your answers concise and well under 200 words .",
          //   },
          //   { role: "user", content: inputText },
          // ],
          "messages": messages,
          "max_tokens": 1024,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Full OpenRouter API Response:", JSON.stringify(data, null, 2));

    const modelOutput =
      data.choices[0]?.message?.content || "No response content found.";
    return modelOutput;
  } catch (error) {
    console.error("Error fetching from OpenRouter:", error);
    return "Sorry, an error occurred while getting a response.";
  }
}

export default getModelResponse;
