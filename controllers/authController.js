const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { jwtSecretKey, email } = require('../config');
const { sendVerificationEmail } = require('../utils/email');

//register user
exports.register = async (req, res) => {
    const { email, password, isAdmin } = req.body;

    try {

        //check if user exists already
        const isUserExists = await User.findOne({ email })
        if (isUserExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        //hashing the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        //create a new user and generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex')
        const user = new User({ email, password: hashedPassword, verificationToken, isAdmin })
        await user.save()

        // send the verification token in email
        const verificationLink = `http://localhost:5000/auth/verify-email?token=${verificationToken}`
        await sendVerificationEmail(email, verificationLink);
        res.status(201).json({ message: 'User registered successfully , please verify in your email' })
    } catch (err) {
        console.log("🚀 ~ exports.register= ~ err:", err)
        res.status(400).json({ error: 'Registration failed: ' + err.message });
    }
}

exports.verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        //find the user by verification token
        const user = await User.findOne({ verificationToken: token })
        if (!user) {
            return res.status(400).json({ message: "Invalid token" })
        }

        //make user verified
        user.isVerified = true;
        //make the verificationToken to undefined after verifying
        user.verificationToken = undefined

        await user.save();

        res.status(200).json({ message: 'Email verified successfully' })
    } catch (err) {
        console.log("🚀 ~ exports.verifyEmail= ~ err:", err)
        res.status(400).json({ message: 'email verification failed' + err.message })
    }
}

//user login
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        //check if there is no user or password is not same
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        //check the user is verified by email
        if (!user.isVerified) {
            return res.status(400).json({ message: "Email not verified" })
        }

        //generate jwt and refresh token for login 
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, jwtSecretKey, { expiresIn: '1h' })
        const refreshToken = jwt.sign({ id: user._id }, jwtSecretKey, { expiresIn: '7d' })

        res.json({ token, refreshToken })


    } catch (err) {
        console.log("🚀 ~ exports.login= ~ err:", err)
        res.status(500).json({ error: 'login failed' + err.message })
    }
}

exports.refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    try {
        const decoded = jwt.verify(refreshToken, jwtSecretKey)
        const token = jwt.sign({ id: decoded._id, isAdmin: decoded.isAdmin }, jwtSecretKey, { expiresIn: '1h' })
        res.json({ token })
    } catch (err) {
        console.log("🚀 ~ err:", err)
        res.status(401).json({ message: 'Invalid refresh token' + err.message });
    }
}

