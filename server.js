require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/submit-email', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    await axios.post(process.env.DISCORD_WEBHOOK_URL, {
      content: email
    });
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error('Error sending to Discord:', err.message);
    res.status(500).json({ message: 'Failed to send email to Discord' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
