import express, { response } from "express";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, //Need to be added to the env file
});

router
  .route("/")
  .get((req, res) =>
    res.status(200).json({ message: "Hello from Backend route" })
  );

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openAi.images.generate({
      model: "dall-e-2",
      prompt: "a white cat",
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
