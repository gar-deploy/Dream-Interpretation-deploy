import axios from "axios";
import dreamModel from "../model/dreamModel.js";

const generatedDreams = async (req, res) => {
  try {
    const { usersText } = req.body;
    console.log(usersText);

    if (!usersText) {
      return res
        .status(400)
        .json({ error: "Please describe you dream, it could not be empty." });
    }

    // ---------------      Eden AI ---------------------------
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
        text: usersText,
        chatbot_global_action:
          "analyse the text and convey user's feeling which he saw in dream",
        temperature: 0.0,
        max_tokens: 150,
        fallback_providers: "",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);

        const saveDream = new dreamModel({
          usersText,
          generatedText: response.data.openai.generated_text,
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
