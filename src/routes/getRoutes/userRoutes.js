require('../../../database')
const express = require('express')
const router = express.Router()

const { Deck } = require('../../models/dataSchema')
const { User } = require('../../models/userSchema')

router.get('/seeMyPrivateDecks', async (req, res) => {
    const decks = await Deck.find({private: "true"})
    if(decks.length > 0) {
        res.status(200).json(decks)
    }
    else {
        res.status(404).json({ message: 'Nenhum dado encontrado' })
    }
})

router.get('/seeMyPublicDecks', async (req, res) => {
    const decks = await Deck.find({private: "false"})
    if(decks.length > 0) {
        res.status(200).json(decks)
    }
    else {
        res.status(404).json({ message: 'Nenhum dado encontrado' })
    }
})

module.exports = router