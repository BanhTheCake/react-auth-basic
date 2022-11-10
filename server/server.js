require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const connectDB = require('./config/connectDB')
const mongoose = require('mongoose');
const cors = require('cors')
const helmet = require('helmet')

// Connect To Database
connectDB()

// Logger
app.use((req, res) => {
    console.log(`${req.method} ${req.path}`);
})

// cross origin resource sharing
app.use(cors({
    credentials: true,
    origin: '*'
}))

// Set up basic security for app 
app.use(helmet())

// Router
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Make sure that connect server after connect DB
mongoose.connection.once('open', () => {
    console.log('Connect Database success');
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})


