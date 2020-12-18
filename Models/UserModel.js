const { Schema, model} = require('mongoose')

var UserSchema = Schema({
    fullname: {
        type: "String",
        require: true
    },
    username: {
        type: "String",
        require: true,
        unique: true,
        min: 7
    },
    email: {
        type: "String",
        require: true,
        unique: true
    },
    password: {
        type: "String",
        require: true
    },
    phone: "String",
    //Date of Birth
    dob: "Date"
})

module.exports = model("User", UserSchema)