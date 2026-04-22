# Arogya Mitra - Health Chatbot

**AI-powered multilingual medical chatbot for WhatsApp**

A backend service that delivers accessible health information to rural India via WhatsApp, supporting English, Hindi, and Odia with optimized low-network performance.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Backend | Node.js, Express.js |
| AI/ML | OpenRouter API, LLaMA 3, Gemini Pro Vision, LoRA fine-tuning |
| Messaging | Twilio WhatsApp API |
| Cache | Redis |
| DevOps | ngrok |

## Key Features

- Conversational AI with medical domain knowledge (fine-tuned on medical CoT dataset)
- Multilingual NLP with automatic language detection
- Image-based medical query analysis (skin conditions, rashes)
- Conversational memory for context-aware follow-ups
- Optimized for low-bandwidth connections
- Unanswered query logging for continuous improvement

## Responsibilities

- Designed and implemented RESTful API with Express.js
- Integrated Twilio WhatsApp API for messaging gateway
- Built Redis-based conversation context management
- Connected to OpenRouter for LLM inference
- Implemented image upload and analysis pipeline
- Added responsible AI disclaimers for medical responses

## Getting Started

```bash
git clone https://github.com/Soap-jpg/ALT_F4_HEALTH_CHATBOT.git
cd ALT_F4_HEALTH_CHATBOT
npm install
# Configure .env with Twilio and OpenRouter keys
npm run dev
ngrok http 3001
```

## Demo

Send a WhatsApp message to your Twilio Sandbox number to interact with the bot.

---

*Built for HackMIT 2024*