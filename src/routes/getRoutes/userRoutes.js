require('../../../database')
const express = require('express')
const router = express.Router()
const auth = require('../../auth')

const { Deck } = require('../../models/dataSchema')
const { User } = require('../../models/userSchema')

router.get('/seeMyPrivateDecks', auth, async (req, res) => {
    const decks = await Deck.find({ userName: req.user.name, private: "true" })
    
    if(decks.length > 0) {
        res.status(200).json(decks)
    }  
    else {
        res.status(404).json({ message: 'Nenhum dado encontrado' })
    }
})

router.get('/seeMyPublicDecks', auth, async (req, res) => {
    const decks = await Deck.find({ userName: req.user.name, private: "false" })

    if(decks.length > 0) {
        res.status(200).json(decks)
    }
    else {
        res.status(404).json({ message: 'Nenhum dado encontrado' })
    }
})

// router.get('/seeMyCopiedDecks', auth, async (req, res) => {
//     const user = await User.find({ _id: req.user._id })
//     res.status(200).json({ copiedDecks: user[0].decks_ID})
    
    // for(let i = 0; i < user[0].decks_ID.length; i++) {
    //     console.log(user[0].decks_ID[i])
    // }
// })

router.get('/seeAllMyDecks', auth, async (req, res) => {
    const decks = await Deck.find({ userName: req.user.name })
    
    if(decks.length > 0) {
        res.status(200).json(decks)
    }
    else {
        res.status(404).json({ message: 'Nenhum dado encontrado' })
    }
})

router.get('/seeAllOtherUsers', auth, async (req, res) => {
    const users = await User.find({ $and: [ { _id: { $ne: req.user._id } } ] })
    
    if (users.length > 0) {
        res.status(200).json(users)
    }
    else {
        res.status(404).json({ message: 'Nenhum dado encontrado' })
    }
})

module.exports = router