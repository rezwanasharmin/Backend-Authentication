const mongoose = require('mongoose');
const { Schema } = mongoose;

const userAddressSchema = new Schema({
    road: String,
    city: String,
    state: String,
    zip: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Registration'
    }
});

module.exports = mongoose.model('UserAddress', userAddressSchema);
