// controllers/subscribersController.js
const Subscriber = require("../models/subscriber");

exports.getAllSubscribers = async (req, res, next) => {
  try {
    // Fetch all subscribers from the database
    const subscribers = await Subscriber.find({});

    // Attach the data to the request object for use in the next middleware
    req.data = subscribers;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Pass error to the error handling middleware if something goes wrong
    next(error);
  }
};

// Controller action to render the subscription (contact) page
exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

// Controller action to handle form submission and save a new subscriber to the database
exports.saveSubscriber = async (req, res, next) => {
  try {
    // Create a new subscriber instance using data from the request body
    let newSubscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    });

    // Save the new subscriber to the database
    await newSubscriber.save();

    // Render the thank you page after successful save
    res.render("thanks");
  } catch (error) {
    // Pass error to the error handling middleware instead of sending it directly
    next(error);
  }
};
