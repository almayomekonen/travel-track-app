const openai = require("../util/openai");
const HttpError = require("../models/http-error");
const flatted = require("flatted");

const chatGPTConnection = async (userInput) => {
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

exports.buildTrack = async (req, res, next) => {
  const userMessage = { role: "user", content: req.body.userInput };
  const completionRequest = {
    model: "gpt-4",
    messages: [userMessage],
    temperature: 0.7,
  };

  try {
    const response = await chatGPTConnection(req.body.userInput);
    const assistantMessage = response;

    const flattenedResponse = flatted.stringify({ assistantMessage });
    const parsedResponse = JSON.parse(flattenedResponse);

    res.json(parsedResponse);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.travelTrack = async (req, res, next) => {
  const { latitude, longitude } = req.body;
  try {
    const userInput = `
    🌟 Explore Nearby Recommendations 🌟
    Find me good hotels, restaurants, and places to visit in detail.
    Please include the name of the area, and add some nice emojis.
    Coordinates: ${latitude},${longitude}`;

    const chatResponse = await chatGPTConnection(userInput);

    res.json({ success: true, chatMessage: chatResponse });
  } catch (error) {
    console.error("Error handling travel track:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
