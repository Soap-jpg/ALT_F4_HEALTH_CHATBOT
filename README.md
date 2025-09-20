Arogya Mitra: Sehat Saathi (Health Companion)
An AI-powered public health chatbot designed to provide accessible, reliable, and multilingual medical information for rural and semi-urban communities. The chatbot runs on WhatsApp, optimized for low-network conditions, and supports English, Hindi, and Odia.

✨ Key Features
🧠 Conversational AI: Powered by large language models (via OpenRouter) to answer a wide range of medical queries.

🗣️ Multilingual Support: Seamlessly interacts in English, Hindi, and Odia.

💬 Conversational Memory: Maintains short-term message history using Redis, enabling natural follow-up questions.

⚡ Instant Feedback: Sends a reassuring "Got it. Thinking..." message to users on slow connections before delivering the full response.

📸 Image Recognition (Multimodal): Accepts user-uploaded images (e.g., skin rashes, bites) and provides AI-powered insights.

📝 Unanswered Query Logging: Automatically logs unhandled queries for further analysis and improvement.

🛡️ Responsible AI: Every response includes a mandatory disclaimer, encouraging users to seek professional care.

🏗️ System Architecture
Frontend (WhatsApp): User interaction via WhatsApp.

Messaging Gateway (Twilio): Receives and sends WhatsApp messages.

Backend Server (Node.js & Express): Orchestrates communication between services and manages user sessions.

Short-Term Memory (Redis): Caches conversation history for contextual responses.

AI Engine (OpenRouter): Routes prompts to large language models like LLaMA 3 and Gemini Pro Vision.

🛠️ Tech Stack
Backend: Node.js, Express.js

AI Models: OpenRouter (LLaMA 3, Gemini Pro Vision, etc.)

Messaging: Twilio API for WhatsApp

Database/Cache: Redis

Deployment: ngrok (for local development)

🚀 Getting Started
Prerequisites
Node.js (v16 or later)

Redis (local or cloud instance)

ngrok (for tunneling local server)

Accounts for Twilio and OpenRouter

Installation
Clone the repository:

bash
git clone https://github.com/Soap-jpg/ALT_F4_HEALTH_CHATBOT.git
cd health_chatbot
Install dependencies:

bash
npm install
Configure environment variables:
Create a .env file in the root directory with the following:

bash
PORT=3001

# Twilio Credentials
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your_auth_token_here"

# OpenRouter API Key
OPENROUTER_API_KEY="sk-or-xxxxxxxxxxxxxxxxxxxxxxx"

# Redis (optional, defaults to localhost)
REDIS_URL="redis://localhost:6379"
Running the Application
Start the development server:

bash
npm run dev
Expose locally with ngrok:

bash
ngrok http 3001
Copy the generated public URL (e.g., https://xxxx.ngrok-free.app).

Configure Twilio Webhook:

Go to your Twilio WhatsApp Sandbox settings.

In WHEN A MESSAGE COMES IN, paste:

text
https://<your-ngrok-url>/api/chat/webhook
Set method to HTTP POST and save.

Start chatting:

Send a WhatsApp message to your Twilio Sandbox number.

The chatbot will respond in your chosen language.
