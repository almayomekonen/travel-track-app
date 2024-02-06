const { OpenAI } = require("openai");

const OPENAI_API_KEY = process.env.CHAT_GPT_KEY;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

module.exports = openai;
