// test-api.js - Simple test script for the API endpoint
const testPrompt = `Create 11 AI personas for a focus group in the Technology industry.

Include these core roles:
1. CEO / Founder
2. Marketing Director  
3. HR / Culture Officer
4. Legal Advisor
5. Operations Manager

Then add 6 more personas relevant to the Technology industry.
Return the result as a valid JSON array with each persona having: name, role, description.`;

async function testAPI() {
  try {
    // Use centralized BASE_URL (if available) or fallback to detection
    const BASE_URL = window.BASE_URL || (window.location.hostname.includes("vercel.app")
      ? "https://bizcore360-ai.vercel.app"
      : "http://127.0.0.1:5500");
    
    console.log("Testing /api/openai endpoint...");
    console.log("Using BASE_URL:", BASE_URL);
    
    const response = await fetch(`${BASE_URL}/api/openai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: testPrompt
      })
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log("Response data:", data);

    if (response.ok) {
      console.log("✅ API test successful!");
      try {
        const personas = JSON.parse(data.reply);
        console.log(`✅ Successfully parsed ${personas.length} personas`);
        console.log("Sample persona:", personas[0]);
      } catch (parseError) {
        console.error("❌ Failed to parse JSON:", parseError);
        console.log("Raw reply:", data.reply);
      }
    } else {
      console.error("❌ API error:", data);
    }
  } catch (error) {
    console.error("❌ Network error:", error);
  }
}

// Run test when page loads (for browser testing)
if (typeof window !== 'undefined') {
  window.testAPI = testAPI;
  console.log("Test function available. Run testAPI() in console to test the endpoint.");
}