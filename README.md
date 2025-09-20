Arogya Mitra : Your AI Health Companion on WhatsApp
In many parts of India, getting quick and reliable health information is a real challenge. Slow internet and language barriers can make it difficult for people in rural and semi-urban areas to get the answers they need. Sehat Saathi (Health Companion) was built to solve this problem.

It's a smart, friendly chatbot on WhatsApp that provides easy-to-understand medical information in English, Hindi, and Odia. We've optimized it to work even on slow connections, ensuring that reliable health knowledge is just a message away.

✨ What It Can Do
Ask Anything, Get Answers: Get clear answers to a wide range of medical questions, powered by a powerful AI trained on trusted medical knowledge.

Speaks Your Language: Chat naturally in English, Hindi, or Odia. The bot automatically detects the language and replies in the same one.

Remembers Your Conversation: Ask follow-up questions without having to repeat yourself. The bot uses Redis to remember the context of your chat.

Works on Slow Networks: We built this with low connectivity in mind. You'll get an instant "Got it, thinking..." message, so you know your query is being handled, even if your network is slow.

Analyze Health Images: Send a picture of a skin rash or an insect bite, and the AI can analyze it and provide helpful information.

Always Improving: If the bot can't answer a question, it logs it anonymously so we can improve its knowledge base over time.

Safe and Responsible: Every answer includes a clear disclaimer reminding users to consult a professional doctor for medical advice.

🏗️ How It's Built
The app is a modern backend service designed for reliability and speed:

The User: Interacts with the bot on WhatsApp.

The Gateway: Twilio securely handles all incoming and outgoing WhatsApp messages.

The Brain: A Node.js & Express server manages all the logic, from handling requests to managing conversation state.

The Memory: Redis provides a super-fast, short-term memory for each user's conversation.

The Knowledge: OpenRouter gives us access to powerful large language models (like Llama 3 and Gemini Pro Vision) to understand and answer questions.

🛠️ Tech Stack
Backend: Node.js, Express.js

AI: OpenRouter (Llama 3, Gemini Pro Vision)

Messaging: Twilio API for WhatsApp

In-Memory Store: Redis

Local Tunneling: ngrok

🚀 Get It Running
Want to run the project yourself? Here’s how to get started.

You'll Need:
Node.js (v16+)

Redis installed locally or on the cloud.

Accounts for ngrok, Twilio, and OpenRouter.

Setup Steps:
Clone the project:

git clone <your-repository-url>
cd health_chatbot

Install the dependencies:

npm install

Set up your environment variables:
Create a .env file in the root folder and add your secret keys.

# Server Port
PORT=3001

# Twilio API Keys
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your_auth_token_here"

# OpenRouter API Key
OPENROUTER_API_KEY="sk-or-xxxxxxxxxxxxxxxxxxxxxxx"

# Redis URL (defaults to localhost if you leave it out)
REDIS_URL="redis://localhost:6379"

Launching the Bot:
Start the server:

npm run dev

Create a public URL with ngrok:
In a new terminal, run:

ngrok http 3001

Copy the public https://<...>.ngrok-free.app URL.

Connect Twilio to your server:

Go to your Twilio WhatsApp Sandbox settings.

In the "WHEN A MESSAGE COMES IN" field, paste your ngrok URL and add the path: /api/chat/webhook.

Make sure the method is HTTP POST and save.

Start Chatting!
You're all set. Send a message to your Twilio Sandbox number on WhatsApp and start a conversation.
