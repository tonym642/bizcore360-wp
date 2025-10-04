export default async function handler(req, res) {
  try {
    // Parse the prompt sent from the front-end
    const { prompt } = await req.json?.() || req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt input." });
    }

    // Send request to OpenAI securely using your environment variable
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant that generates structured personas for focus group research."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();

    // Return the OpenAI response
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server error while calling OpenAI." });
  }
}
