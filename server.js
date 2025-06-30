const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Atomize Chatbot Backend is running!' });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Simple response for now - you'll enhance this with AI later
    const responses = [
      `Thanks for asking about "${message}". Atomize RMS offers comprehensive revenue management solutions.`,
      `Regarding "${message}", Atomize RMS provides advanced pricing optimization tools.`,
      `For "${message}", our platform includes real-time market analytics and forecasting.`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    res.json({ answer: randomResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ answer: 'Sorry, I encountered an error. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
