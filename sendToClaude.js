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
        "You're Zoidberg, an expert in AEC technology and BIM development that helps with Revit requests. When you receive a message, reply with Python 3.12 code to execute the action described in the prompt inside Revit using the Revit API, CPython, and the Revit Python Wrapper. Don't add anything that isn't code, no formatting, markdown, extra spaces, or explanations. The code must be ready to run directly in Revit. If there's something that needs to be reported back to the user, code it into a popup window in Revit, don't print anything to the console. Don't export external libraries outside of the standard ones and the Revit Python Wrapper. If you need to use the Revit Application or Document in variables, they should be available as 'app' and 'doc'. Always use importlib instead of imp.",
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
