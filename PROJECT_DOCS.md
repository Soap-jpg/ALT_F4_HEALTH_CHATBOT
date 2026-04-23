# Arogya Mitra: Health Chatbot

## Project Overview

**Arogya Mitra** is an AI-powered WhatsApp chatbot designed to provide accessible, reliable, and multilingual medical information for rural and semi-urban communities in India. The bot runs directly on WhatsApp - the most accessible platform in rural India - and is optimized for low-network conditions.

---

## What I Built

A backend service that handles incoming WhatsApp messages via Twilio, processes them through a large language model via OpenRouter, and returns AI-generated medical responses. The system maintains conversation context using Redis and automatically detects user language (English, Hindi, or Odia).

---

## Technical Details

### Architecture Flow
```
User → WhatsApp → Twilio API → Express Server → OpenRouter (LLM)
                                                  ↓
                                              Redis Cache
                                                  ↓
                                              Twilio API → User
```

### Backend (index.js)
- Express.js server running on port 3001
- Middleware: helmet (security headers), cors, morgan (logging), express.json
- Single webhook endpoint: `/api/chat/webhook`
- Immediately returns 200 OK to Twilio, then processes message asynchronously

### Message Handling (chatController.js)
- Webhook handler receives `Body`, `From`, and `To` from Twilio
- Sends immediate "Please wait..." acknowledgment for low-network UX
- Retrieves conversation history from Redis (key = user phone number)
- Builds message array with system prompt + history + new message
- System prompt enforces:
  - Language detection (English/Hindi/Odia)
  - Medical knowledge domain only (MedQA dataset)
  - Chain-of-thought reasoning
  - Refusal protocol for non-medical queries
  - Mandatory medical disclaimers
- Sends response back via Twilio Messages API
- Stores updated conversation in Redis with 900s TTL

### AI Integration (modelService.js)
- Connects to OpenRouter API (free tier)
- Uses LLaMA 3.3 8B Instruct model
- Passes full conversation history for context
- Max 1024 tokens in response
- Error handling with fallback messages

### Conversation Memory (redisClient.js)
- Creates Redis connection on startup
- Stores per-user conversation history as JSON
- TTL: 900 seconds (15 minutes)
- Enables natural follow-up questions

### Unanswered Query Logging (logger.js)
- Logs failed/unanswerable queries to `unanswered_questions.log`
- Enables continuous improvement of the system
- File-based logging (not database)

---

## Key Features Implemented

1. **Conversational AI**: LLM-powered responses for nuanced medical queries with chain-of-thought reasoning

2. **Multilingual Support**: Automatic language detection - responds in same language as user's query (English, Hindi, Odia)

3. **Contextual Memory**: Redis-backed conversation history enables natural follow-up questions within 15-minute window

4. **Low-Network Optimization**: Sends instant "Please wait..." acknowledgment before full response (crucial for rural India with slow 2G/3G)

5. **Responsible AI**: 
   - System prompt restricts to medical domain only
   - Mandatory disclaimers on every response
   - Polite refusal for non-medical queries
   - Unanswered query logging for improvement

6. **Image Recognition (Multimodal)**: Can accept user-uploaded images (skin rashes, bites) via Gemini Pro Vision

---

## Tech Stack

| Component | Technology |
|-----------|-------------|
| Backend | Node.js, Express.js |
| Server Runtime | Node.js ES Modules |
| Messaging Gateway | Twilio WhatsApp API |
| AI/ML | OpenRouter API (LLaMA 3.3, Gemini Pro Vision) |
| Conversation Cache | Redis |
| Development | ngrok (webhook tunneling) |
| Security | Helmet, CORS |

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/api/chat/webhook` | POST | Twilio webhook for incoming WhatsApp messages |

---

## Environment Variables

```
PORT=3001
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_token
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxx
REDIS_URL=redis://localhost:6379
```

---

## Deployment

1. **Local Development**: 
   - `npm run dev` starts server with nodemon
   - `ngrok http 3001` creates public tunnel
   - Configure Twilio Sandbox webhook to ngrok URL

2. **Production Ready**:
   - Cloud Redis (Upstash, Redis Cloud)
   - PM2 for process management
   - Environment变量 in production secrets

---

## Challenges Solved

- **Low-network conditions**: Acknowledgment message improves perceived performance
- **Language barriers**: Automatic language detection and response matching
- **Context management**: Redis TTL ensures memory doesn't grow unbounded
- **Responsible AI**: System prompt enforces medical domain boundaries and mandatory disclaimers
- **Cost optimization**: OpenRouter free tier + LoRA fine-tuning reduces inference costs

---

## Files Structure

```
ALT_F4_HEALTH_CHATBOT/
├── index.js              # Express server entry point
├── controllers/
│   └── chatController.js # Message handling logic
├── routes/
│   └── chatRoutes.js     # Route definitions
├── services/
│   └── modelService.js   # OpenRouter API integration
├── config/
│   └── redisClient.js   # Redis connection
├── util/
│   └── logger.js       # Unanswered query logging
├── .env                 # Environment variables
└── package.json         # Dependencies
```

---

## What I Learned

- Building production-ready webhook handlers with Twilio
- Integrating LLMs via OpenRouter API
- Managing conversational context with Redis
- Designing prompts for domain-specific AI behavior
- Handling multilingual NLP in a low-resource setting
- Optimizing for low-bandwidth networks
- Implementing responsible AI with system prompts

---

## Future Improvements (Optional)

- Fine-tune model on medical CoT dataset (done in separate notebooks)
- Add voice message support
- Implement appointment booking with doctors
- Add symptom checker flow with questions
- Deploy to cloud (Railway/Render/Vercel)