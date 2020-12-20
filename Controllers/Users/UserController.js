const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require("../../Models/UserModel")
const { registerValidator, loginValidator } = require('./Validator')

var UserController = {
    login: async(req, res) => {
        try{
            await loginValidator(req.body)

            const user = await (req.body.email == null) ? User.findOne({username: req.body.username}) :
                user.findOne({email: req.body.email})
            
            //Elementos almacenados en en user
            //solorzanonatalia26@gmail.com slorzanonatalia@gmail.com
            //Un objeto de tipo User / null

            if(!user)
                throw {error: true, message: "Email or user not found"}
                //return res.status(400).json({error: true, message: "Email or username not found"})
                var logged = await bcrypt.compare(req.body.password, user.password)

                if(!logged)
                    throw {error: true, message: "Wrong Password"}
                
                const token = jwt.sign({_id: user._id}, process.env.TOKEN_KEY)
                return res.status(200).json({token: token})
                
        }
        catch(err){
            return res.status(400).json(err.details != null ? err.details[0].message : err)
        }
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

            let hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT))

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

    getUsers: async(rconst bcrypt = require('bcrypt')
    const jwt = require('jsonwebtoken')
    
    const User = require('../../models/UserModel')
    const { registerValidator, loginValidator } = require('./Validator')
    
    var UserController = {
        login: async(req, res) => {
            try{
                await loginValidator(req.body)
    
                const user = (req.body.email == null) ? await User.findOne({username: req.body.username}) : 
                    await user.findOne({email: req.body.email})
    
                if(!user)
                    throw {error: true, message: "Username or Email not found"}
    
                console.log(user);
    
                var logged = await bcrypt.compare(req.body.password, user.password)
    
                if(!logged)
                    throw {error: true, message: "Wrong password"}
    
                const token = jwt.sign({_id: user._id}, process.env.TOKEN_KEY)
                return res.status(200).json({token: token})
            }
            catch(err) {
                console.log(err);
                return res.status(400).json(err.details != null ? err.details[0].message : err)
            }
        },
    
        register: async(req, res) => {
            try {
                await registerValidator(req.body)
                
                const notUnique = await User.find({ $or: [{username: req.body.username}, {email: req.body.email}]})
    
                if(notUnique.length != 0)
                    throw "Email or username already registered"
    
                let hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT))
    
                let newUser = new User({
                    fullname: req.body.fullname,
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    phone: req.body.phone,
                    dob: req.body.dob
                })
    
                await newUser.save()
                return res.status(201).json({error: false, message: "Registered/Created"})
            }
            catch(err) {
                return res.status(400).json(err.details != null ? err.details[0].message : err)
            }
        },
        
        updateUser: async(req, res) => {
    
        },
    
        requestPassword: async(req, res) => {
    
        },
    
        requestPasswordHandler: async(req, res) => {
    
        },
    
        getUsers: async(req, res) => {
            try{
                console.log(req.query);
                const { page = 1, limit = 10 } = req.query
    
                const users = await User.find()
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec()
    
                const count = await User.countDocuments()
    
                return res.status(200).json({
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    users
                })
            }
            catch(err) {
                console.log(err);
                return res.status(500).json({error: true, message: "Something went wrong"})
            }
        },
    
        getCurrentUser: async(req, res) => {
            const user = await User.findOne({_id: req.user._id})
    
            return res.status(200).json(user)
        }
    }
    
    module.exports = UserControllereq, res) => {
        try{
            const {page = 1, limit = 10} = req.query

            const users = await User.find()
                .limit(limit)
                .skip((page = 1) * limit)
                .exec()

            //Retornar en que pagina esta --page
            //Cuantos elementos existen --variable
            //Los elementos
            const count = await User.countDocuments()
            return res.status(200).json({
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                users
            })
        }
        //400
        catch(er){
            return res.status(500).json({error: true, message: "Something Went Wrong"})
        }
    },

    getCurrentUser: async(req, res) => {
        console.log(`Ejecutando Metodo`)
        const user = await User.findOne({_id: req.user._id})

        return res.status(200).json(user)
    }
}

module.exports = UserController