const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    ecode:{
       type: String,
       required: true
    },
    password: {
        type: String,
        required : true
    }
});

const user = mongoose.model('User', UserSchema);
module.exports = user;