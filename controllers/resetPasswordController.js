const RegistrationModel = require('../models/registationModel');
const bcrypt = require('bcryptjs');

const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = await RegistrationModel.findOne({ email: email });

        if (!user) {
            return res.send("User not found, please enter a valid email");
        }

        let hashPassword = bcrypt.hashSync(newPassword, 10);

        await RegistrationModel.findOneAndUpdate({ email: email }, { password: hashPassword });

        res.send("Password reset successfully");
    } catch (error) {
        res.send("Error resetting password: " + error.message);
    }
};

module.exports = resetPasswordController;
