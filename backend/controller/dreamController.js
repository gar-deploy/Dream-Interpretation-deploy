import axios from "axios";
import dreamModel from "../model/dreamModel.js";

const generatedDreams = async (req, res) => {
  try {
    const { dream } = req.body;

    if (!dream) {
      return res.status(400).json({
        error:
        "Please describe your dream, it might be left empty or typed in the correct key. Instead, write this way - " + "{"+ "'"+ "dream"+ "'"+ ":"  + "'"+"Enter your dream"+"'"+ "}."});
    }

    // ---------------      Eden AI    ---------------------------
    const apiKey = process.env.EDENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key not provided" });
    }

    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/chat",
      headers: {
        authorization: `Bearer ${apiKey}`,
      },
      data: {
        providers: "openai",
        text: dream,
        chatbot_global_action:
          "Analyse the text and convey user's feeling which he saw in dream. And it should feel like you are talking to the user.",
        temperature: 0.0,
        max_tokens: 150,
        fallback_providers: "",
      },
    };

    axios
      .request(options)
      .then((response) => {
        const saveDream = new dreamModel({
          dream,
          generatedDream: response.data.openai.generated_text,
        });

        saveDream.save();

        res.status(200).json(saveDream);
      })
      .catch((error) => {
        console.error("Error in axios request:", error.message);
        res.status(500).json({ error: "Failed to fetch dreams" });
      });
  } catch (error) {
    console.log("Error in dreamController", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default generatedDreams;
