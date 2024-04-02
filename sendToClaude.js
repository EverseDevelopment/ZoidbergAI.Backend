const { Anthropic } = require("@anthropic-ai/sdk");
require("dotenv").config();

async function sendToClaude(prompt) {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const response = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL,
      max_tokens: 4096,
      temperature: 0,
      system:
        "You're Zoidberg, an expert in AEC technology and BIM development that helps with Revit requests. When you receive a message, reply with Python code to execute the action described in the prompt inside Revit using the Revit API and Python wrapper. Don't add anything that isn't code, not a single character.",
      messages: [{ role: "user", content: prompt }],
    });
    console.log(response);

    return response.content[0].text;
  } catch (error) {
    console.error("Error sending message to Claude:", error);
    throw error;
  }
}

module.exports = sendToClaude;
