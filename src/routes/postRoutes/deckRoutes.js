require('../../../database');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { Deck, Card } = require('../../models/dataSchema');
const { User, UserDeckIDs } = require('../../models/userSchema');

router.post('/newDeck', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    const user = await User.findOne({ _id: data._id, 'tokens.token': token })

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
        if(deckCards[i].front == '' || deckCards[i].back == '') {
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
        userName: user.name
    })

    try {
        const userUpdate = await User.findOneAndUpdate({ _id: data._id, 'tokens.token': token }, { $push: { decks: IdDoDeck}})
        const newDeckToUser = await newDeck.save()
        // User.update({ decks_ID: newDeckToUser._id  }, { $push: { newDeckToUser._id }})
        // user.decks_ID.addToSet(newDeckToUser._id)
        await user.save()
        console.log(user)
        res.status(201).json({ message: 'Card created successfully' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router


// const User = require('../../models/userSchema');
// const auth = require('../../auth');

// router.post('/users', async (req, res) => {

//     const userName = req.body.name;
//     const userPassoword = req.body.password;
//     const userEmail = req.body.email;
//     const containNumbers = /[0-9]/gi;
//     const containLetters = /[A-Z]/gi;

//     const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//     if (!emailValidation.test(userEmail)) {
//         res.status(406).json({ message: 'Insert a valid email' });
//         return
//     }

//     if (typeof (userName) != 'string') {
//         res.status(406).json({ message: 'Insert a name with at least one letter' });
//         return
//     }

//     if (userName.match(containLetters) == null || userName.match(containNumbers) == null) {
//         res.status(406).json({ message: 'Name must contain at least one letter and one number' });
//         return
//     }

//     if (typeof (userPassoword) != 'string') {
//         res.status(406).json({ message: 'Insert a password with at least one letter' });
//         return
//     }

//     if (userPassoword.match(containLetters) == null || userPassoword.match(containNumbers) == null) {
//         res.status(406).json({ message: 'Passoword must contain at least one letter and one number' });
//         return
//     }

//     if (userPassoword.length < 8) {
//         res.status(406).json({ message: 'Insert a password with more than 6 characters' });
//         return
//     }

//     const emailIsRegistered = await User.findOne({ email: req.body.email });

//     if (emailIsRegistered) {
//         res.status(409).json({ message: 'Email is already registered' });
//         return
//     }

//     try {
//         const user = new User(req.body);
//         await user.save();
//         const token = await user.generateAuthToken();
//         res.status(201).json({ user: user, token: token })
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

// router.post('/users/login', async (req, res) => {
//     try {
//         const { email, password } = req.body
//         const user = await User.findByCredentials(email, password)
//         if (!user) {
//             return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
//         }
//         const token = await user.generateAuthToken()
//         res.send({ user, token })
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

// router.post('/users/me/logout', auth, async (req, res) => {
//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token != req.token
//         })
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// router.post('/users/me/logoutall', auth, async (req, res) => {
//     try {
//         req.user.tokens.splice(0, req.user.tokens.length)
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })
