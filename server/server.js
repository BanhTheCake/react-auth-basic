require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const connectDB = require('./config/connectDB')
const mongoose = require('mongoose');
const cors = require('cors')
const helmet = require('helmet')
const handleError = require('./middleware/handleError.middleware')
const routeApiV1 = require('./routes/v1/root.route')
const cookieParser = require('cookie-parser')

// Connect To Database
connectDB()

// Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next()
})

// cross origin resource sharing
app.use(cors({
    credentials: true,
    origin: '*'
}))

// Set up basic security for app 
app.use(helmet())

// Need to use req.body
app.use(express.json())

// Set up cookies parser
app.use(cookieParser())

// Router
app.use('/api/v1', routeApiV1)

// handle Not found Router
app.all('*', (req, res) => {
    return res.status(404).json({
        message: `Your route ${req.path} is not define`
    })
})

// Handle error
app.use(handleError)

// Make sure that connect server after connect DB
mongoose.connection.once('open', () => {
    console.log('Connect Database success');
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})


