const express = require('express');
const app = express();
const getRoutes = require('./src/routes/getRoutes/routes');
const loginRoutes = require('./src/routes/postRoutes/loginRoutes');
const deckRoutes = require('./src/routes/postRoutes/deckRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(cors());

app.use('/', getRoutes);
app.use('/', loginRoutes);
app.use('/', deckRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`EbbiBack is on in port ${PORT}`))