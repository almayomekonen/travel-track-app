const openai = require("../util/openai");
const HttpError = require("../models/http-error");

exports.chatGPTConnection = async (userInput) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: userInput }],
      temperature: 0.7,
    });

    const assistantMessage = response.choices[0].message.content;

    return assistantMessage;
  } catch (error) {
    throw new HttpError("Error creating chat connection.", 500);
  }
};