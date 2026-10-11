const RegistrationModel = require('../models/registationModel');

let editUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        await RegistrationModel.findByIdAndUpdate(id, { username, email, password }, { new: true });
        res.send("User updated successfully");
    } catch (error) {
        res.send("Error updating user");
    }
}

module.exports = editUserController;
