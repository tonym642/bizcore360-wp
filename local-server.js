// local-server.js - For local development testing
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Import the API handler (we'll need to adapt it for Node.js)
const handler = async (req, res) => {
  // Enable CORS for local development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/api/openai' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        console.log('📨 Received POST request to /api/openai');
        const { prompt } = JSON.parse(body);
        console.log('📝 Prompt received:', prompt ? 'Present' : 'Missing');
        
        if (!prompt) {
          console.log('❌ No prompt provided');
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Prompt is required' }));
          return;
        }

        // Get OpenAI API key from environment variables
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
        
        if (!OPENAI_API_KEY) {
          console.error('❌ OPENAI_API_KEY not found in environment variables');
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'OpenAI API key not configured. Set OPENAI_API_KEY environment variable.' }));
          return;
        }

        console.log('🚀 Sending request to OpenAI...');

        // Make request to OpenAI API
        const fetch = (await import('node-fetch')).default;
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { 
                role: 'system', 
                content: 'You are an AI assistant that generates structured personas for focus group research. Always return valid JSON arrays only.' 
              },
              { role: 'user', content: prompt }
            ],
            temperature: 0.8
          })
        });

        const data = await response.json();
        console.log('📨 OpenAI response status:', response.status);
        
        if (!response.ok) {
          console.error('❌ OpenAI API error:', data);
          res.writeHead(response.status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'OpenAI API request failed', details: data }));
          return;
        }

        const content = data.choices[0].message.content;
        console.log('✅ OpenAI response received:', content ? 'Success' : 'Empty');
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: content }));
        
      } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error', message: error.message }));
      }
    });
    return;
  }

  // Serve static files
  const filePath = req.url === '/' ? './index.html' : `.${req.url}`;
  const extname = path.extname(filePath).toLowerCase();
  
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
};

const server = http.createServer(handler);

server.listen(PORT, () => {
  console.log(`🚀 Local development server running at http://localhost:${PORT}`);
  console.log('📝 Make sure to set your OPENAI_API_KEY environment variable');
  console.log('💡 Example: OPENAI_API_KEY=sk-your-key node local-server.js');
});