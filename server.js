const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to add this environment variable in Railway
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Atomize Chatbot Backend is running!' });
});

// Chat endpoint with OpenAI integration
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ answer: 'Please provide a message.' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant for Atomize RMS, a leading revenue management system for hotels. You help answer questions about hotel revenue management, pricing optimization, demand forecasting, and Atomize's specific features and capabilities. Be helpful, informative, and professional. Keep responses concise but comprehensive."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ answer: aiResponse });
    
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Fallback response if OpenAI fails
    const fallbackResponses = [
      `Thanks for asking about "${message}". Atomize RMS offers comprehensive revenue management solutions.`,
      `Regarding "${message}", Atomize RMS provides advanced pricing optimization tools.`,
      `For "${message}", our platform includes real-time market analytics and forecasting.`
    ];
    
    const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    res.json({ answer: fallbackResponse });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
