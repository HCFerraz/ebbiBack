const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    frontSide: { type: String, trim: true, required: true },
    backSide: { type: String, trim: true, required: true },
    _id: false
});

const deckSchema = new mongoose.Schema({
    categorie: { type: String, required: true },
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, default: '' },
    image: { type: String },
    cards: [cardSchema]
});

const Card = mongoose.model('Data', cardSchema);
const Deck = mongoose.model('Deck', deckSchema);

module.exports = {
    Deck, 
    Card
}