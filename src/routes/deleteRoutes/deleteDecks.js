//Not on use

require('../../../database')
const express = require('express')
const router = express.Router()
const auth = require('../../auth')
const { User } = require('../../models/userSchema')
const { Deck } = require('../../models/dataSchema')

router.delete('/userDeckDeleter', auth, async (req, res) => {
    try {
        await Deck.findByIdAndDelete({ _id: req.body._id})
        await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { decks_ID: req.body._id } })
        res.status(200).json({ message: 'Deletion successful' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router