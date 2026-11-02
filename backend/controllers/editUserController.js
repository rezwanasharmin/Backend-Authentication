const RegistrationModel = require('../models/registationModel');
const bcrypt = require('bcryptjs');

let editUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        let updateData = { username, email };
        if (password && password.trim() !== "") {
            updateData.password = bcrypt.hashSync(password, 10);
        }

        await RegistrationModel.findByIdAndUpdate(id, updateData, { new: true });
        res.send("User updated successfully");
    } catch (error) {
        res.send("Error updating user");
    }
}

module.exports = editUserController;
