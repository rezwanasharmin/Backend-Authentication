const RegistrationModel = require('../models/registationModel');

let deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        await RegistrationModel.findByIdAndDelete(id);
        res.send("User deleted successfully");
    } catch (error) {
        res.send("Error deleting user");
    }
}

module.exports = deleteUserController;
