const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const appRoutes = require('./src/routes/getRoutes/appRoutes');
const userRoutes = require('./src/routes/getRoutes/userRoutes');
const loginRoutes = require('./src/routes/postRoutes/loginRoutes');
const deckRoutes = require('./src/routes/postRoutes/deckRoutes');
const copyDecks = require('./src/routes/updateRoutes/copyDecks')
const deleteDecks = require('./src/routes/deleteRoutes/deleteDecks')

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(cors());

app.use('/', appRoutes);
app.use('/', userRoutes);
app.use('/', loginRoutes);
app.use('/', deckRoutes);
app.use('/', copyDecks)
app.use('/', deleteDecks)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`EbbiBack is on in port ${PORT}`))