# BizCore360 AI Dashboard

A powerful AI-driven business dashboard with focus group generation capabilities.

## 🚀 Quick Start

### Local Development

1. **Clone and Setup**
   ```bash
   cd BizCore360
   npm install
   ```

2. **Set up Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Run Local Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Main Dashboard: http://localhost:3000
   - Polls Setup: http://localhost:3000/polls-setup.html
   - Polls List: http://localhost:3000/polls.html

### Vercel Deployment

1. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

2. **Set Environment Variables in Vercel**
   - Go to Vercel Dashboard > Your Project > Settings > Environment Variables
   - Add `OPENAI_API_KEY` with your actual API key
   - Set Environment to "Production"

3. **Redeploy**
   ```bash
   vercel --prod
   ```

## 🛠 API Routes

### POST /api/openai
Securely handles OpenAI API calls server-side.

**Request:**
```json
{
  "prompt": "Generate 11 business personas for the [industry] industry..."
}
```

**Response:**
```json
{
  "reply": "[{\"name\": \"John Doe\", \"role\": \"Marketing Director\", ...}]"
}
```

## 📁 Project Structure

```
/BizCore360
├── api/
│   └── openai.js          # Serverless API for OpenAI calls
├── assets/
│   └── logo.svg
├── polls-setup.html       # Focus group generation interface
├── polls.html            # Polls dashboard with table view
├── index.html            # Main dashboard
├── vercel.json           # Vercel deployment config
├── package.json          # Dependencies and scripts
├── local-server.js       # Local development server
└── .env.example          # Environment variables template
```

## 🔑 Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)

## 🎯 Features

- ✅ Secure server-side OpenAI API integration
- ✅ Dynamic focus group persona generation
- ✅ Responsive polls dashboard with table view
- ✅ Local development environment
- ✅ Vercel serverless deployment ready
- ✅ No client-side API key exposure

## 🧪 Testing

1. Start the local server: `npm run dev`
2. Go to http://localhost:3000/polls-setup.html
3. Enter an industry (e.g., "Software Development")
4. Click "Generate My Focus Group"
5. Verify personas appear without CORS errors

## 📝 Notes

- The API key is never exposed to the client-side
- All OpenAI calls are routed through the secure `/api/openai` endpoint
- The local development server mimics Vercel's serverless environment
- CORS is handled automatically for local development