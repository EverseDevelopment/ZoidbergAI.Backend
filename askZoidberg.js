const sendToClaude = require("./sendToClaude");

async function askZoidberg(userQuestion) {
  try {
    // Step 2: Build Prompt
    let prompt = `This is the user request: ${userQuestion}.`;

    // Step 3: Send Data to the Antrhopic API
    const code = await sendToClaude(prompt);

    // Step 4: Return code
    return code;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

module.exports = askZoidberg;
