const userAddressModel = require('../models/userAdressModel');

const adressController = async (req, res)=>{

    const { road, city, state, zip, userId } = req.body || {};

    const adress = await userAddressModel.find().populate("userId");
    res.send(adress);

};

module.exports = adressController;
