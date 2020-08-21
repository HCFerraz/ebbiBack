const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    frontSide: { type: String },
    backSide: { type: String },
    _id: false
})

const deckSchema = new mongoose.Schema({
    categorie: { type: String },
    name: { type: String, lowercase: true, required: true },
    description: { type: String, required: false, default: '' },
    image: { type: String },
    cards: [cardSchema]
})

const Card = mongoose.model('Data', cardSchema)
const Deck = mongoose.model('Deck', deckSchema)

module.exports = {
    Deck, 
    Card
}