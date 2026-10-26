const UserAddress = require('../models/userAdressModel');

const userAddressController = async (req, res) => {


    const { road, city, state, zip } = req.body;

    const newAddress = new UserAddress({
        road : road,
        city : city,
        state : state,
        zip : zip
    });
    await newAddress.save();

    console.log(newAddress);
    res.send('User address saved successfully');
}

module.exports = userAddressController;
