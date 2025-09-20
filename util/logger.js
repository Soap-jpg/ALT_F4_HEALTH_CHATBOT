import fs from "fs/promises";
import path from "path";

const logFilePath = path.join(process.cwd(), "unanswered_questions.log");

export async function logUnansweredQuery(message) {
  try {
    const logEntry = `${message}\n`;
    await fs.appendFile(logFilePath, logEntry);
  } catch (error) {
    console.error("Error logging unanswered query:", error);
  }
}
