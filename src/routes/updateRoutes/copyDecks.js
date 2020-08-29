//Not on use

require('../../../database');
const express = require('express');
const router = express.Router();
const auth = require('../../auth');

const { User, UserDeckIDs } = require('../../models/userSchema');

router.patch('/copy', auth, async (req, res) => {
    try {
        let deckId = []
        deckId.push(new UserDeckIDs({
            id: req.body._id
        }))
        const userUpdate = await User.findOneAndUpdate({ _id: req.user._id }, { $push: { decks_ID: deckId } })
        await userUpdate.save()

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('deleteCopiedDeck', auth, async (req, res) => {
    try {
        let deckId = []
        deckId.push(new UserDeckIDs({
            id: req.body._id
        }))

        const userUpdate = await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { decks_ID: deckId } })
        await userUpdate.save()

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router