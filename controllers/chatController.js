import twilio from "twilio";
import getModelResponse from "../services/modelService.js";
import redisClient from "../config/redisClient.js";
import { logUnansweredQuery } from "../util/logger.js";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function handleSlowProcess(from, incomingMsg, twilioNumber) {
  try {
    const CONVERSATION_TTL = 900;
    const historyRaw = await redisClient.get(from);

    let history = historyRaw
      ? JSON.parse(historyRaw)
      : [
          {
            role: "system",
            content: `You are an expert medical AI assistant. Your primary function is to provide clear and accurate information based on the knowledge contained within the MedQA dataset, which is primarily in English. You must follow these critical rules without exception.

### Core Task
Your main task is to receive a user's question in English, Hindi, or Odia, and provide a concise, accurate answer in the same language based on your medical knowledge.

### Critical Rules
1.  **Language Adherence**: You MUST identify the language of the user's query (English, Hindi, or Odia). Your final response must be written exclusively in that same language. Do not mix languages.
2.  **Knowledge Domain**: Your knowledge is strictly limited to the medical and clinical information found in the MedQA dataset.
3.  **Chain-of-Thought Reasoning**: For every valid medical query, first, use an internal monologue to reason through the problem step-by-step based on your MedQA knowledge. Then, formulate the final answer for the user. Do not expose your internal monologue.

### Refusal Protocol
If a user asks about any topic outside of your medical knowledge domain (e.g., small talk, personal questions, non-medical topics), you must refuse politely using the exact phrase for their language:
* **English**: "I can only answer questions related to the medical knowledge found in the MedQA dataset. How can I help you with a medical query?"
* **Hindi**: "मैं केवल MedQA डेटासेट में पाई जाने वाली चिकित्सा जानकारी से संबंधित प्रश्नों का उत्तर दे सकता हूँ। मैं आपकी चिकित्सा संबंधी प्रश्न में कैसे मदद कर सकता हूँ?"
* **Odia**: "ମୁଁ କେବଳ MedQA ଡାଟାସେଟରେ ଥିବା ଚିକିତ୍ସା ସମ୍ବନ୍ଧୀୟ ପ୍ରଶ୍ନର ଉତ୍ତର ଦେଇପାରିବି। ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?"

### Examples of Correct Behavior
* **User (English):** "What are the main symptoms of malaria?"
* **Bot (English):** "The main symptoms of malaria include high fever, chills, headache, and muscle pain.
    Disclaimer: I am an AI assistant. This information is not a substitute for professional medical advice. Please consult a doctor."

* **User (Hindi):** "मधुमेह के लक्षण क्या हैं?"
* **Bot (Hindi):** "मधुमेह के मुख्य लक्षणों में अधिक प्यास लगना, बार-बार पेशाब आना और अत्यधिक थकान शामिल है।
    डिस्क्लेमर: मैं एक एआई सहायक हूँ। यह जानकारी पेशेवर चिकित्सा सलाह का विकल्प नहीं है। कृपया डॉक्टर से सलाह लें।"

* **User (Odia):** "ମ୍ୟାଲେରିଆର ଲକ୍ଷଣ କଣ?"
* **Bot (Odia):** "ମ୍ୟାଲେରିଆର ମୁଖ୍ୟ ଲକ୍ଷଣଗୁଡ଼ିକ ହେଉଛି ପ୍ରବଳ ଜ୍ୱର, ଶୀତ ଲାଗିବା ଏବଂ ମୁଣ୍ଡବିନ୍ଧା।
    ଡିସକ୍ଲେମର: ମୁଁ ଜଣେ AI ଆସିଷ୍ଟାଣ୍ଟ ଅଟେ। ଏହି ସୂଚନା ପେସାଦାର ଡାକ୍ତରୀ ପରାମର୍ଶର ବିକଳ୍ପ ନୁହେଁ। ଦୟାକରି ଜଣେ ଡାକ୍ତରଙ୍କ ସହିତ ପରାମର୍ଶ କରନ୍ତୁ।"`,
          },
        ];

    history.push({ role: "user", content: incomingMsg });
    const modelResponse = await getModelResponse(history);

    const failurePhrases = [
      "No response content found.",
      "Sorry, an error occurred",
      "I can only answer questions related to medical knowledge",
    ];

    const isFailure = failurePhrases.some((phrase) => modelResponse.includes(phrase));

    if (isFailure) {
      await logUnansweredQuery(incomingMsg);
      console.log(`Logged unanswered query: "${incomingMsg}"`);
    }

    history.push({ role: "assistant", content: modelResponse });

    await redisClient.set(from, JSON.stringify(history), {
      EX: CONVERSATION_TTL,
    });

    await client.messages.create({
      body: modelResponse,
      from: twilioNumber,
      to: from,
    });
    console.log(`Sent response to ${from}: "${modelResponse}"`);
  } catch (error) {
    console.error("Error in slow process:", error);
  }
}

async function runBackgroundTasks(from, incomingMsg, twilioNumber) {
  try {
    await client.messages.create({
      body: "Please wait...",
      from: twilioNumber,
      to: from,
    });

    await handleSlowProcess(from, incomingMsg, twilioNumber);
  } catch (error) {
    console.error("Error in background tasks:", error);
  }
}

export const handleWebhook = async (req, res) => {
  const incomingMsg = req.body.Body;
  const from = req.body.From;
  const twilioNumber = req.body.To;

  console.log(`Received message from ${from}: "${incomingMsg}"`);

  res.status(200).send("OK");

  runBackgroundTasks(from, incomingMsg, twilioNumber);
};
