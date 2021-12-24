const express  = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
// =============================================

// Importing Routes
const UserRoute = require('./routes/userRoute')
const UndefinedRoute = require('./controllers/undefinedRoute')

// =============================================
// Doenv variables
const PORT = process.env.PORT || 3534
const DB_KEY = process.env.DB_KEY
// =============================================

// DataBase connection
mongoose.connect(DB_KEY)

const db = mongoose.connection

db.once('error', () => {console.log(`DataBase wasn't load!`)})
db.once('open', () => {       
    // Setting tools
    const app = express()

    // Setting cookies,cors,urlencoded
    app.use(cookieParser())
    app.use(cors())
    app.use(bodyParser.json());
    app.use(express.urlencoded({extended:true}))
    // =============================================

    // Routes
    app.use('/',UserRoute)
    app.use('*',UndefinedRoute)


    app.listen(PORT,() => {console.log(`Server running on PORT:${PORT}`)})

    console.log(`DataBase loaded!`)
})
