const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber");

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection;

const contacts = [
    {
        name: "Jon Wexler",
        email: "jon@jonwexler.com",
        zipCode: 10016
    },
    {
        name: "Chef Eggplant",
        email: "eggplant@recipeapp.com",
        zipCode: 20331
    },
    {
        name: "Professor Souffle",
        email: "souffle@recipeapp.com",
        zipCode: 19103
    }
];


// First, delete all existing subscribers
Subscriber.deleteMany()
    .then(() => {
        console.log("Subscriber data is empty!");

        // Now create the new subscribers
        const commands = contacts.map(c =>
            Subscriber.create({ name: c.name, email: c.email })
        );

        return Promise.all(commands);
    })
    .then(results => {
        console.log(JSON.stringify(results));
    })
    .catch(error => {
        console.error(`ERROR: ${error}`);
    })
    .finally(() => {
        // Close the connection after all operations complete or fail
        mongoose.connection.close();
    });
