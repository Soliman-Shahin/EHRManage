const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    userId: String,
    socialId: String,
    signupType: {
        type: String,
        enum: ["normal", "facebook", "google"],
        default: "normal"
    },
    type: {
        type: String,
        enum: ["user", "admin"],
        trim: true,
        default: "user"
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
})

userSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePasswords = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

let User = mongoose.model('User', userSchema, 'Users')

module.exports = User