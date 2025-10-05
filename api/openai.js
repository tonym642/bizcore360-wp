import OpenAI from "openai";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "POST request required" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that generates structured personas for focus group research.",
        },
        { role: "user", content: prompt },
      ],
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: error.message });
  }
}
