const registrationModel = require('../models/registationModel');

const allUserController = async (req, res) => {
    try {
        let allUsers = await registrationModel.find({});
        res.send(allUsers);
    } catch (error) {
        res.send(error);
    }
}

module.exports = allUserController;
