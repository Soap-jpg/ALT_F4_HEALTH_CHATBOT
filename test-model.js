import getModelResponse from "./services/modelService.js";

async function main() {
  const prompt = "What are the symptops of malaria?";
  const response = await getModelResponse(prompt);
  console.log("Model Response:", response);
}

main();