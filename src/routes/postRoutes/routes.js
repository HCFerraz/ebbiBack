require('../../../database')
const express = require('express')
const router = express.Router()

const User = require('../../schemas/userSchema');
const { Deck, Card } = require('../../schemas/deckSchema')

const passwordAuthorizated = async (req, res) => {
    const password = req.header('Password');
    const user = await User.findOne({ password: password });
    if (!user) {
        res.status(401).json({ message: 'Access denied: Invalid password' });
        return false;
    };
    return true;
};

router.post('/signUp', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username: username });
    const pswd = await User.findOne({ password: password });
    if (user) {
        res.status(200).json({ message: 'Already exists' });
        return;
    }
    if (pswd) {
        res.status(200).json({ message: 'Wrong password' })
        return
    }

    const newUser = new User({
        email: username,
        password: password,
    });
    try {
        newUser.save()
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/newCard', async (req, res) => {
    let card = []
    for (let i = 0; i < req.body.cards.length; i++) {
        card.push(new Card({
            frontSide: req.body.cards[i].front,
            backSide: req.body.cards[i].back
        }))
    }
    const newDeck = new Deck({
        categorie: req.body.categorie,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        cards: card
    })
    try {
        newDeck.save()
        res.status(201).json({ message: 'Card created successfully' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
// router.post('/newCard', async (req, res) => {
//     const newDeck = new Deck({
//         categorie: req.body.categorie,
//         name: req.body.name,
//         description: req.body.description,
//         image: req.body.image,
//         cards: [{
//             frontSide: req.body.cards[0].front,
//             backSide: req.body.cards[0].back
//         },
//         {
//             frontSide: req.body.cards[1].front,
//             backSide: req.body.cards[1].back
//         }]
//     })
//     try {
//         newDeck.save()
//         res.status(201).json({ message: 'Card created successfully' })
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

module.exports = router