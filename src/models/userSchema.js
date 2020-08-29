const mongoose = require('mongoose')
const hasher = require('bcrypt')
const jwt = require('jsonwebtoken')

const Ids = mongoose.Schema({
    id: String,
    _id: false 
})

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
        minLength: 8
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    decks_ID: [Ids]
})

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
    const user = await User.findOne({ email: email })
    if (!user) {
        console.error.bind(console, 'Invalid login credentials')
    }
    const isPasswordMatch = await hasher.compare(password, user.password)
    if (!isPasswordMatch) {
        console.error.bind(console, 'Invalid login credentials')
    }
    return user
}

const User = mongoose.model('Usuario', userSchema)
const UserDeckIDs = mongoose.model('UserDeck', Ids)

module.exports = {
    User,
    UserDeckIDs
};