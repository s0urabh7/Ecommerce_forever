import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// router for user login
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, message: 'User does not exists!'})
        }
        const isMatched = await bcrypt.compare(password, user.password) 
        if(isMatched){
            const token = createToken(user._id)
            res.json({success: true, token})
        }
        else{
            res.json({success: false, message: 'Invalid credentials!'})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// route for user registration
const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body
        // check if user already exist
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false, message: 'User already exists!'})
        }
        // validate email and strong password
        if(!validator.isEmail(email)){
            return res.json({success: false, message: 'Enter valid email!'})
        }
        if(password.length<8){
            return res.json({success: false, message: 'Please enter strong password!'})
        }
        // hashing user password because we will store hashed password in database so if in case db is hacked password will be encrypted
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

// route for admin login
const adminLogin = async(req, res) => {
    try {
        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else{
            res.json({success: false, message: 'Invalid credentials!'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

export {loginUser, registerUser, adminLogin}