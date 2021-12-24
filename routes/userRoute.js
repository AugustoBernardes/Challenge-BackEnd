const express = require("express");
const route = express.Router()
const upload = require('../utils/multer')
// =============================================

// Importing Controllers
const {HomePage,Login,newMovies,addMovie,aproveMovie,aprovedMovies,deleteMovie} = require('../controllers/userController')
const authentication = require('../controllers/loginAuthentication');
const { Router } = require("express");

// GET
route.get('/',HomePage)
route.get('/newmovies',authentication,newMovies)
route.get('/aprovedmovies',authentication,aprovedMovies)

// POST
route.post('/login',Login)
route.post('/update/:id',authentication,aproveMovie)
route.post('/addmovie',authentication,upload.single('image'),addMovie)

// DELETE
route.delete('/remove/:id',authentication,deleteMovie)

module.exports = route