const twilio = require('twilio');
const { accountSid, authToken } = require('./twilio_auth');

module.exports = new twilio.Twilio(accountSid, authToken);
