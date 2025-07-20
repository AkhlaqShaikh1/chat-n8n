const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/chat', chatController.sendMessageToN8n);
router.post('/n8n-response', chatController.receiveMessageFromN8n); // New endpoint for n8n to send responses

module.exports = router;