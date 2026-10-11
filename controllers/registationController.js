const RegistrationModel = require('../models/registationModel');

let registrationController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = new RegistrationModel({
            username: username,
            email: email,
            password: password
        });
        await user.save();
        res.send('Registration successful');
    } catch (error) {
        res.send(error);
    }
}

module.exports = registrationController;
