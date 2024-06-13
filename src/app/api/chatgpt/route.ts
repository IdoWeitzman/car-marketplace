import { Car, Model } from "@/app/types";
import axios from "axios";
import { NextApiRequest } from "next";
import { getPrompt } from "./chatgpt.promt";

export interface PostBidModalBody extends NextApiRequest {
  json: () => Promise<Model & {picture_url: Car['picture_urls'][number]}>;
}

export async function POST(request: PostBidModalBody) {
    const { make, model, year, picture_url } = await request.json();

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'system',
            content: 'You are writing second hand car marketplace description.',
          },
          {
            role: 'user',
            content: getPrompt({ make, model, year, picture_url }),
          }
        ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      return Response.json({ result: response.data.choices[0].message.content });
    } catch (error) {
      console.error(error);
      return Response.json({ error: 'Failed to fetch data from OpenAI API' });
    }

}
