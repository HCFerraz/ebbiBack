const mongoose = require('mongoose')
const hasher = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// userSchema.pre('validate', function (next) {
//     const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if(!emailValidation.test(this.email)) {
//         throw new Error
//     }
//     next()
// })

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hasher.hash(this.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY)
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        console.error.bind(console, 'Invalid login credentials')
    }
    const isPasswordMatch = await hasher.compare(password, user.password)
    if (!isPasswordMatch) {
        console.error.bind(console, 'Invalid login credentials')
    }
    return user
}

const User = mongoose.model('Usuario', userSchema);

module.exports = User;