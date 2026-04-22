# Arogya Mitra: Health Chatbot

AI-powered WhatsApp chatbot providing multilingual medical information for rural and semi-urban communities in India.

## Problem

Limited access to reliable health information in rural India due to slow internet connectivity and language barriers.

## Solution

A conversational AI chatbot optimized for low-network conditions, running directly on WhatsApp with support for English, Hindi, and Odia.

## Features

- **Conversational AI**: LLM-powered responses for nuanced medical queries
- **Multilingual Support**: Automatic language detection and response in English, Hindi, and Odia
- **Contextual Memory**: Redis-backed conversation history for natural follow-up questions
- **Optimized for Low Networks**: Instant "Thinking..." acknowledgment message
- **Multimodal Analysis**: Image-based insights (skin conditions, bites, etc.)
- **Unanswered Query Logging**: Automatic logging for continuous improvement
- **Responsible AI**: Mandatory medical disclaimers on all responses

## System Architecture

```
[WhatsApp] → [Twilio] → [Node.js/Express Backend] → [OpenRouter (LLM)]
                ↓                                    ↓
           [Webhook]                              [Redis Cache]
```

- **Frontend**: WhatsApp (most accessible platform for target users)
- **Messaging**: Twilio WhatsApp API
- **Backend**: Node.js, Express
- **AI Engine**: OpenRouter (LLaMA 3, Gemini Pro Vision)
- **Cache**: Redis for conversation context

## AI Model Fine-Tuning

- **Method**: LoRA (Low-Rank Adaptation) via Unsloth library
- **Dataset**: FreedomIntelligence/medical-o1-reasoning-SFT
- **Strategy**: Chain-of-Thought prompting for step-by-step medical reasoning

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Backend | Node.js, Express |
| AI | OpenRouter API (LLaMA 3, Gemini Pro Vision) |
| Messaging | Twilio WhatsApp API |
| Cache | Redis |
| Dev Tools | ngrok |

## Getting Started

```bash
# Clone and install
git clone https://github.com/Soap-jpg/ALT_F4_HEALTH_CHATBOT.git
cd ALT_F4_HEALTH_CHATBOT
npm install

# Configure environment (.env)
PORT=3001
TWILIO_ACCOUNT_SID="your_sid"
TWILIO_AUTH_TOKEN="your_token"
OPENROUTER_API_KEY="sk-or-xxx"
REDIS_URL="redis://localhost:6379"

# Run development server
npm run dev

# Expose with ngrok
ngrok http 3001

# Configure Twilio webhook to: https://<your-url>/api/chat/webhook
```

## License

MIT