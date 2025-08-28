// models/subscriber.js
const mongoose = require("mongoose");

// Define the schema for Subscriber
const subscriberSchema = mongoose.Schema({
  name: String,      // Subscriber's name
  email: String,     // Subscriber's email
  zipCode: Number    // Subscriber's zip code (assuming numeric)
});

// Export the model based on the schema
module.exports = mongoose.model("Subscriber", subscriberSchema);

