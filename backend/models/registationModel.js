const mongoose = require('mongoose');
const { Schema } = mongoose;

const registrationSchema = new Schema({
    username: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('Registration', registrationSchema);
