# Arogya Mitra: Your AI Health Companion"🩺 
An AI-powered public health chatbot designed to provide accessible, reliable, and multilingual medical information for rural and semi-urban communities.

In many parts of India, getting quick and reliable health information is a real challenge. Slow internet and language barriers can make it difficult for people to get the answers they need. Sehat Saathi was built to solve this problem by running directly on WhatsApp, optimized for low-network conditions, and supporting English, Hindi, and Odia.

## ✨ Key Features
🧠 Conversational AI: Powered by large language models to answer a wide range of medical queries with nuanced understanding.

🗣️ Multilingual Support: Seamlessly interacts in English, Hindi, and Odia, automatically detecting the user's language.

💬 Conversational Memory: Maintains short-term message history using Redis, enabling natural follow-up questions.

⚡ Instant Feedback: Sends a reassuring "Got it. Thinking..." message to users on slow connections before delivering the full response.

📸 Image Recognition (Multimodal): Accepts user-uploaded images (e.g., skin rashes, bites) and provides AI-powered insights using models like Gemini Pro Vision.

📝 Unanswered Query Logging: Automatically logs unhandled queries to a text file for further analysis and improvement.

🛡️ Responsible AI: Every response includes a mandatory disclaimer, encouraging users to seek professional care.

## How It's Built
### 1) The application is a modern backend service that connects multiple technologies to create a seamless user experience.

### 2) System Architecture
  Frontend (WhatsApp): The user interacts with the bot on the most accessible platform.

  Messaging Gateway (Twilio): Securely handles all incoming and outgoing WhatsApp messages.

  Backend Server (Node.js & Express): The core of the application, orchestrating communication between services and managing user sessions.

  Short-Term Memory (Redis): Caches conversation history for each user, providing the context for follow-up questions.

  AI Engine (OpenRouter): Routes prompts to a variety of powerful large language models like LLaMA 3 and Gemini Pro Vision.

### 3) AI Model Fine-Tuning
The AI's medical reasoning capability was enhanced through a fine-tuning process using the following techniques:

Fine-tuning Technique: To make training feasible, we used Low-Rank Adaptation (LoRA), a parameter-efficient fine-tuning (PEFT) method. The process was significantly accelerated using the unsloth library.

Dataset: The model was trained on the FreedomIntelligence/medical-o1-reasoning-SFT dataset, which is specifically designed for medical Chain-of-Thought (CoT) reasoning.

Prompting Strategy: The model was trained with a specific prompt template to encourage it to "think" step-by-step before providing a final answer.

## 🛠️ Tech Stack
Backend: Node.js, Express.js

AI Models: OpenRouter (LLaMA 3, Gemini Pro Vision, etc.)

Messaging: Twilio API for WhatsApp

Database/Cache: Redis

Deployment: ngrok (for local development)

## 🚀 Getting Started
Prerequisites
Node.js (v16 or later)

Redis (local or cloud instance)

ngrok (for tunneling local server)

Accounts for Twilio and OpenRouter

## Installation
Clone the repository:

git clone [https://github.com/Soap-jpg/ALT_F4_HEALTH_CHATBOT.git](https://github.com/Soap-jpg/ALT_F4_HEALTH_CHATBOT.git)
cd health_chatbot

## Install dependencies:

npm install

Configure environment variables:
Create a .env file in the root directory with the following:

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

npm run dev

Expose locally with ngrok:
In a new terminal, run:

ngrok http 3001

Copy the generated public URL (e.g., https://xxxx.ngrok-free.app).

Configure Twilio Webhook:

Go to your Twilio WhatsApp Sandbox settings.

In "WHEN A MESSAGE COMES IN", paste your ngrok URL with the webhook path: https://<your-url>/api/chat/webhook

Set the method to HTTP POST and save.

Start Chatting!
Send a WhatsApp message to your Twilio Sandbox number. The chatbot will respond in your chosen language.
