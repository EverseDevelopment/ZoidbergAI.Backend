require("dotenv").config();
const askZoidberg = require("./askZoidberg.js");

exports.zoidbergAssistant = async (req, res) => {
  const apiKey = req.headers["x-api-key"] || req.query.api_key;

  if (!apiKey || apiKey !== process.env.ENDPOINT_API_KEY) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }

  try {
    const userInstruction =
      req.query.instruction ||
      res.status(400).send({
        error:
          "Please provide an instruction for Zoidberg in your query parameters.",
      });
    const answer = await askZoidberg(userInstruction);
    res.status(200).send({ answer });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "An error occurred" });
  }
};
