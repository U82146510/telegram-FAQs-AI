# 🤖 Telegram AI FAQ Bot with OpenAI & Redis

This is a powerful Telegram bot built with **grammY**, **OpenAI**, and **Redis**. It uses AI to respond to user questions with natural, human-like answers based on a large predefined FAQ dataset.

## ✨ Features

- 🧠 AI-powered answers using OpenAI GPT-3.5
- 📁 Structured FAQ knowledge base in `middleware/FAQs/`
- 📌 User registration and contact storage in Redis
- 🧮 Semantic search using OpenAI Embeddings + cosine similarity
- ⚡ Built with TypeScript and the grammY framework

---

## 📁 Project Structure

. ├── index.ts # Bot entry point ├── commands.ts # Basic commands (e.g. /start) ├── cousine.ts # Cosine similarity helper ├── embed_text.ts # Preprocessing and embedding FAQs ├── send_requests_to_openai.ts # Handles GPT response generation ├── redis.ts # Redis connection logic ├── middleware/ │ └── FAQs/ # Folder with your structured FAQ files ├── vector-cache.json # Cached OpenAI embeddings (generated) ├── faqs.json # (Optional) Combined preprocessed FAQ dataset ├── .env # Environment variables (tokens/keys)


---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone  https://github.com/U82146510/telegram-FAQs-AI.git
cd telegram-ai-faq-bot
2. Install dependencies
npm install
3. Set up .env
Create a .env file:
BOT_TOKEN=your_telegram_bot_token
OPENAI_API_KEY=your_openai_api_key
REDIS_URL=redis://localhost:6379
Make sure Redis is running locally or adjust the REDIS_URL.
🧠 FAQ Embedding (One-time Setup)

Before starting the bot, you need to generate embeddings for all your FAQ questions:
in index.ts there is " //await embedText();  // vectoring the questions"   uncomment it and let it do it`s job.
This will:

    Read your FAQ questions from middleware/FAQs/

    Create OpenAI embeddings

    Save them into vector-cache.json
▶️ Run the bot
ts-node index.ts
📊 Redis Usage

Every new user who sends a message is automatically registered in Redis:

    Stored as a hash: user<id>

    Includes: id, username, language, and full name

    All user IDs are also pushed to a Redis list called users

📬 How It Works

    User sends a question (e.g. “how do I cancel my subscription?”)

    Bot embeds the question using OpenAI

    Bot compares it to existing FAQ embeddings (cosine similarity)

    Top matches are sent to GPT to generate a helpful, natural response

    Bot replies with AI-generated text
🤓 Tech Stack

    grammY – Telegram Bot Framework

    OpenAI GPT-3.5

    Redis – User session & data storage

    TypeScript – Strict, safe typing


