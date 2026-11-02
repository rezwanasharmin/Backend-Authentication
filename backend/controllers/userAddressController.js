const UserAddress = require('../models/userAdressModel');

const userAddressController = async (req, res) => {


    const { road, city, state, zip, userId } = req.body;

    const newAddress = new UserAddress({
        road : road,
        city : city,
        state : state,
        zip : zip,
        userId : userId
    });
    await newAddress.save();

    console.log(newAddress);
    res.send('User address saved successfully');
}

module.exports = userAddressController;
