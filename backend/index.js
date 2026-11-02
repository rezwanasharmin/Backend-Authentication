const express = require('express');
const app = express();
const mongoose = require('mongoose');
const registrationController = require('./controllers/registationController');
const allUserController = require('./controllers/allUsersController');
const deleteUserController = require('./controllers/deleteUserController');
const editUserController = require('./controllers/editUserController');
const loginController = require('./controllers/logInController');
const userAddressController = require('./controllers/userAddressController');
const adressController = require('./controllers/adressController');
const forgetPasswordController = require('./controllers/forgetPasswordController');
const resetPasswordController = require('./controllers/resetPasswordController');
const cors = require('cors');

// mongodb+srv://node-2026:OC26wj1WTRjXrAf4@cluster0.7pvw29u.mongodb.net/?appName=Cluster0
// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://node-2026:OC26wj1WTRjXrAf4@cluster0.7pvw29u.mongodb.net/?appName=Cluster0").then(() => {
    console.log("Connected to MongoDB sucessfully" );
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});


app.post("/registration",registrationController);
app.post("/login", loginController);

app.get("/allusers", allUserController);

app.post("/editUser/:id", editUserController);

app.delete("/deleteUser/:id", deleteUserController);

app.post("/user/address", userAddressController);
app.get("/address", adressController);

app.post("/forgetpassword", forgetPasswordController);
app.post("/resetpassword", resetPasswordController);


app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

module.exports = app;
