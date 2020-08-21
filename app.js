const express = require('express');
const app = express();
const getRoutes = require('./src/routes/getRoutes/routes')
const postRoutes = require('./src/routes/postRoutes/routes')
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors());

app.use('/', getRoutes)
app.use('/', postRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`EbbiBack is on in port ${PORT}`))