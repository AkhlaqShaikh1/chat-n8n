require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL,
  // Add other production-specific configurations here
};