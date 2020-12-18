const bcrypt = require('bcrypt')

const User = require("../../Models/UserModel")
const { registerValidator } = require('./Validator')

var UserController = {
    login: async(req, res) => {

    },

    register: async(req, res) => {
        try{
            await registerValidator(req.body)
            /**MongoDB
             * SELECT * FROM USERS WHERE user.email = req.body.email OR user.username = req.body.username
             */

            // Exist req.body.email || req.body.username
            const notUnique = await User.find({ $or: [{username: req.body.username}, {email: req.body.email}]})

            if(notUnique.length != 0)
                throw "Email or username already registered"

            let hashedPassword = await bcrypt.hash(req.body.password, process.env.SALT)

            //Para comparar las password
            //var pass = await bcrypt.compare(hashedPassword, originalPassword)

            let newUser = new User({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                phone: req.body.phone,
                dob: req.body.dob
            })
            await newUser.save()

            return res.status(201).json({error: "false", message: "Registered/Created"})
        }
        catch(err){
            //console.log(err);
            return res.status(400).json(err.details != null ? err.details[0].message : err)
        }
    /*
               
    */
    },

    updateUser: async(req, res) => {

    },

    requestPassword: async(req, res) => {

    },

    requestPasswordHandler: async(req, res) => {

    },

    getUsers: async(req, res) => {

    },

    getCurrentUser: async(req, res) => {

    }
}

module.exports = UserController