const registaionModel = require('../models/registationModel');
const bcrypt = require('bcryptjs');


const loginController = async (req, res) => {

    const { email, password } = req.body;

    const user = await registaionModel.findOne({ email: email});

    if(!user){
        return res.send('Not registered user, please register first');
    }

    const passwordCheck = await bcrypt.compareSync(password, user.password);

    console.log(passwordCheck);

    if(!passwordCheck){
        res.send('Invalid password');
    }else{
        res.send('User logged in successfully');
    }

}

module.exports = loginController;
