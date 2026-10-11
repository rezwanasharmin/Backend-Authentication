const express = require('express');
const app = express();
const mongoose = require('mongoose');
const registrationController = require('./controllers/registationController');
const allUserController = require('./controllers/allUsersController');
const deleteUserController = require('./controllers/deleteUserController');
const editUserController = require('./controllers/editUserController');

// mongodb+srv://node-2026:OC26wj1WTRjXrAf4@cluster0.7pvw29u.mongodb.net/?appName=Cluster0
// Middleware to parse JSON requests
app.use(express.json());

mongoose.connect("mongodb+srv://node-2026:OC26wj1WTRjXrAf4@cluster0.7pvw29u.mongodb.net/?appName=Cluster0").then(() => {
    console.log("Connected to MongoDB sucessfully" );
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});


app.post("/registration",registrationController);


app.get("/allusers", allUserController);

app.post("/editUser/:id", editUserController);

app.delete("/deleteUser/:id", deleteUserController);


app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
