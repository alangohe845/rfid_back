const mongoose = require('mongoose');
const bycript = require('bcryptjs')
const userSchema = mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    }
    ,email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (next) {
    try {
        const salt = await bycript.genSalt(10);
        const hashpass = await bycript.hash(this.password, salt);
        this.password = hashpass;
        next()
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model('User', userSchema, 'users');