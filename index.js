const express = require("express");
const mongoose = require('mongoose')
const feedsRouter = require('./routes/feeds')


const app = express()
const port = 6969;

mongoose.connect('mongodb://localhost:27017/latestdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error occurred:'))
db.once('open', () =>{
    console.log('I am now connected to MongoDb')
})

app.use(express.json())
app.use('/feeds', feedsRouter)

app.listen(port, () =>{
    console.log('Server is running on port:', port)
})



