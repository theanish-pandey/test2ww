const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
// const PORT = 3000;
const PORT = process.env.PORT || 3000;
// app.use(bodyParser.json());
// // Route to send WhatsApp message
// app.post('/send-message', async (req, res) => {
//   try {
//     const { phoneNumber, message } = req.body;
    
//     // WhatsApp Business API endpoint
//     const apiUrl = `${process.env.META_API_BASE_URL}/me/messages?access_token=${process.env.META_ACCESS_TOKEN}`;
    
//     // Payload for sending WhatsApp message
//     const payload = {
//       messaging_type: "MESSAGE_TAG",
//       recipient: {
//         phone_number: phoneNumber
//       },
//       message: {
//         text: message
//       }
//     };

//     // Sending request to WhatsApp Business API
//     const response = await axios.post(apiUrl, payload);

//     res.status(200).json({ success: true, data: response.data });
//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });


// Route handler for the root URL
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173'
  }));

app.get(' https://graph.facebook.com/v18.0/248127141708785/messages ', (req, res) => {
    res.send('Welcome to the WhatsApp message sender backend!');
  });

app.post('/send-message', async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      const accessToken = process.env.WHATSAPP_ACCESS_TOKEN; // Access token from .env file
      const message = 'Hello from your backend! This is a test message.';
      // Sending message using WhatsApp Business API
      let data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": phoneNumber, // Use the phone number from the request body
        "type": "template",
        "template": {
          "name": "hello_world",
          "language": {
            "code": "en_US"
          }
        }
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://graph.facebook.com/v18.0/248127141708785/messages', // Replace with your actual URL
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`, // Use the access token
        },
        data : data
      };

      // Making the request to send the message
      const response = await axios.request(config);
      // If the message was sent successfully
      if (response.status === 200) {
        res.status(200).json({ message: 'Message sent successfully.' });
      } else {
        res.status(500).json({ error: 'Failed to send message.' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

app.listen(PORT, () => {
console.log(`Server is running at http://localhost:${PORT}`);
});
