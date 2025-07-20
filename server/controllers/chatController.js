const axios = require('axios');
const config = require('../config');

exports.sendMessageToN8n = async (req, res, next) => {
  const { message, chatId } = req.body; // Get chatId from request body
  const { n8nWebhookUrl } = config;

  if (!n8nWebhookUrl) {
    return res.status(500).json({ error: 'N8N_WEBHOOK_URL is not defined.' });
  }

  try {
    // Send the user's message and chatId to n8n
    await axios.post(n8nWebhookUrl, { message, chatId });
    console.log('Message sent to n8n:', { message, chatId });
    res.status(200).json({ success: true, message: 'Message sent to n8n for processing.' });
  } catch (error) {
    console.error('Error sending message to n8n:', error);
    next(new Error('Failed to send message to n8n.')); // Pass error to error handling middleware
  }
};

exports.receiveMessageFromN8n = async (req, res) => {
  const { message, chatId } = req.body; // Get message and chatId from n8n's response
  console.log('Message received from n8n:', { message, chatId });
  const io = req.app.get('socketio');
  const chatIdToSocketIdMap = req.app.get('chatIdToSocketIdMap');

  if (chatId && chatIdToSocketIdMap[chatId]) {
    const targetSocketId = chatIdToSocketIdMap[chatId];
    io.to(targetSocketId).emit('botResponse', { message, chatId }); // Emit to specific client
    res.status(200).json({ success: true, message: 'Message received by server and emitted to client.' });
  } else {
    console.warn(`Could not find active socket for chatId: ${chatId}. Message not delivered to client.`);
    res.status(404).json({ error: 'Chat ID not found or socket disconnected.' });
  }
};