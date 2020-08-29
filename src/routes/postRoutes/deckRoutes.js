require('../../../database');
const express = require('express');
const router = express.Router();
const auth = require('../../auth');

const { Deck, Card } = require('../../models/dataSchema');
const { User, UserDeckIDs } = require('../../models/userSchema');

router.post('/newDeck', auth, async (req, res) => {
    const deckName = req.body.name;
    const deckCards = req.body.cards;
    if (deckName == '') {
        res.status(406).json({ message: "Insert the deck's name with at least one character" });
        return
    }

    let card = []
    if (deckCards.length == 0) {
        res.send({ message: 'Fill all fields' })
        return
    }

    for (let i = 0; i < deckCards.length; i++) {
        if (deckCards[i].front == '' || deckCards[i].back == '') {
            res.status(406).json({ message: 'Each card must contain at least one information' })
            return
        }
        card.push(new Card({
            frontSide: deckCards[i].front,
            backSide: deckCards[i].back
        }))
    }

    const newDeck = new Deck({
        categorie: req.body.categorie,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        cards: card,
        userName: req.user.name
    })

    try {
        await newDeck.save()

        let deckId = []
        deckId.push(new UserDeckIDs({
            id: newDeck._id
        }))

        const userUpdate = await User.findOneAndUpdate({ _id: req.user._id }, { $push: { decks_ID: deckId } })
        await userUpdate.save()

        res.status(201).json({ message: 'Card created successfully' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router