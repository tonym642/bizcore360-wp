import OpenAI from "openai";

export default async function handler(req, res) {
  // Log incoming request
  console.log(`🚀 API Request: ${req.method} ${req.url}`);
  console.log(`📍 Origin: ${req.headers.origin || 'No origin header'}`);
  console.log(`🌐 User-Agent: ${req.headers['user-agent'] || 'Unknown'}`);

  // Enhanced CORS headers for localhost and vercel.app domains
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5500',
    'null' // For file:// protocol during local development
  ];
  
  const origin = req.headers.origin;
  
  // Allow any vercel.app subdomain or specific allowed origins
  const isVercelDomain = origin && origin.includes('.vercel.app');
  const isAllowedOrigin = allowedOrigins.includes(origin);
  
  if (isAllowedOrigin || isVercelDomain || !origin) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log('✅ CORS preflight request handled');
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    console.log(`❌ Method ${req.method} not allowed`);
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  console.log("📨 Request body:", req.body ? "Present" : "Missing");
  const { prompt } = req.body || {};
  console.log("📝 Prompt:", prompt ? `Present (${prompt.length} chars)` : "Missing");

  if (!prompt || typeof prompt !== 'string') {
    console.log("❌ No valid prompt provided in request body");
    return res.status(400).json({ 
      error: "Prompt is required and must be a string",
      received: typeof prompt 
    });
  }

  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY not found in environment variables");
    return res.status(500).json({ error: "OpenAI API key not configured" });
  }

  try {
    console.log("Initializing OpenAI client...");
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log("🤖 Sending request to OpenAI...");
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that generates structured personas for focus group research. Always return valid JSON arrays only.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8
    });

    const content = completion.choices[0].message.content;
    console.log("✅ OpenAI response received:", content ? `Success (${content.length} chars)` : "Empty");
    console.log("📤 Sending response to client...");

    return res.status(200).json({ 
      reply: content,
      timestamp: new Date().toISOString(),
      model: "gpt-4o-mini"
    });
  } catch (error) {
    console.error("❌ Error calling OpenAI:", error);
    console.error("❌ Error details:", {
      message: error.message,
      type: error.type,
      code: error.code
    });
    
    return res.status(500).json({ 
      error: "Failed to generate personas", 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

<!-- forced-sync: 2025-10-21 17:41:54 -->
