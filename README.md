Arogya Mitra: AI-Powered Public Health Chatbot
Arogya Mitra (Health Companion) is an intelligent, multilingual chatbot designed to provide accessible and reliable medical information to users in rural and semi-urban areas, with a focus on optimizing for low-network conditions.

The chatbot operates on WhatsApp and can understand and respond to user queries in English, Hindi, and Odia. It leverages a powerful AI model to answer questions based on the MedQA dataset while ensuring a responsive and user-friendly experience.

Key Features
Conversational AI: Powered by a large language model (via OpenRouter) to understand and answer a wide range of medical questions.

Multilingual Support: Seamlessly communicates in English, Hindi, and Odia based on the user's prompt.

Conversational Memory: Uses Redis to remember the context of the last few messages, allowing for natural, multi-turn follow-up questions.

Instant Feedback for Slow Networks: Immediately sends a "Got it. Thinking..." message to reassure users on slow connections, then sends the full response when ready.

Image Recognition (Multimodal): Users can send images of medical concerns (e.g., skin rashes, insect bites) and receive an AI-powered analysis.

Unanswered Query Logging: Automatically logs questions the AI cannot answer to a text file for future analysis and improvement.

Responsible AI: Includes a mandatory disclaimer with every response to ensure users seek professional medical advice.

 Architecture
The application is built on a modern, decoupled backend architecture:

Frontend (WhatsApp): Users interact with the bot through the familiar WhatsApp interface.

Messaging Gateway (Twilio): Twilio's API for WhatsApp receives incoming messages and sends outgoing replies.

Backend Server (Node.js & Express): The core of the application. It handles incoming webhooks, manages conversation state, and orchestrates communication between services.

Short-Term Memory (Redis): Stores recent conversation history for each user, enabling contextual understanding.

AI Brain (OpenRouter): Provides access to various large language models to generate intelligent and context-aware responses.

🛠️ Tech Stack
Backend: Node.js, Express.js

AI: OpenRouter (for models like Llama 3, Gemini Pro Vision)

Messaging: Twilio API for WhatsApp

Database: Redis (for caching and session management)

Deployment: ngrok for local development tunneling

🚀 Getting Started
Follow these steps to set up and run the project locally.

Prerequisites
Node.js (v16 or later)

Redis installed and running locally, or a cloud Redis instance.

An ngrok account for local development.

Accounts for Twilio and OpenRouter.

Installation
Clone the repository:

git clone <your-repository-url>
cd health_chatbot

Install dependencies:

npm install

Set up environment variables:
Create a file named .env in the root of the project and add the following keys.

# Server Configuration
PORT=3001

# Twilio Credentials
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your_auth_token_here"

# OpenRouter API Key
OPENROUTER_API_KEY="sk-or-xxxxxxxxxxxxxxxxxxxxxxx"

# Redis Connection URL (optional, defaults to localhost)
REDIS_URL="redis://localhost:6379"

Running the Application
Start the server:

npm run dev

The server will start, typically on port 3001.

Expose your server with ngrok:
In a new terminal window, run:

ngrok http 3001

Copy the public https://<your-id>.ngrok-free.app URL.

Configure the Twilio Webhook:

Go to your Twilio WhatsApp Sandbox settings.

In the "WHEN A MESSAGE COMES IN" field, paste your ngrok URL and append the route: https://<your-id>.ngrok-free.app/api/chat/webhook.

Set the method to HTTP POST and save.

Start Chatting
Send a message from your phone to the Twilio Sandbox number on WhatsApp to start interacting with your bot.
