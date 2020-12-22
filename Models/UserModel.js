const { Schema, model } = require('mongoose')

var UserSchema = Schema({
    fullname: {
        type: "String",
        required: true
    },
    username: {
        type: "String",
        required: true,
        unique: true,
        min: 7
    },
    email: {
        type: "String",
        required: true,
        unique: true
    },
    password: {
        type: "String",
        required: true
    },
    phone: "String",
    //Date of birth
    dob: "Date"
})

module.exports = model("User", UserSchema)