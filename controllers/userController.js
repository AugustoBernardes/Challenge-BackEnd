const Password = require('../models/passwordModel')
const Movies = require('../models/movieModel')
const cloudinary = require('../utils/cloudinary')
const jwt = require('jsonwebtoken')
const movieValidation = require('../controllers/validatingData')
// =============================================

const JWT_SECRET = process.env.JWT_SECRET

// =============================================
const HomePage = (req,res) => {
    res.status(200)
    res.send({
        code:"SUCCESS",
        message:"Project made by: https://github.com/AugustoBernardes"
    })
}

// =============================================
const Login = async (req,res) => {
    try {
        let ReceivedPassword = req.body.password.trim()

        // Searching to password
        let passwordValidation = await Password.findOne({password:ReceivedPassword})

        if(passwordValidation){
            // Creating token
            let token = jwt.sign({password:ReceivedPassword}, JWT_SECRET)

            // Seending to cookies
            res.cookie('token', token, {maxAge:28800000, httpOnly: true})

            res.status(200)
            res.redirect('/newmovies')
        }else{
            res.status(400)
            res.send({
                code:"VALIDATION_ERROR",
                message:"Password incorrect!"
            })
        }

    } catch (error) {
        res.status(400)
        res.send({
            code:"INTERNAL_ERROR",
            message:"Password validation is not working!"
        })
    }
}

// =============================================
const newMovies = async (req,res) => {
    let movies = [];

    try {
        // Getting all the movies saved
        let savedMovies = await Movies.find({})

        // Getting the movies with status analyzing
        savedMovies.forEach(movie => {
            if(movie.status === 'analyzing'){
                movies.push(movie)
            }
        });

        // Validating if have a iten 
        if(movies.length === 0){

            res.status(200)
            res.send({
                code:"SUCCESS",
                message:"Don't have saved movies yet!"
            })
        }else{

            res.status(200)
            res.send(movies)
        }
    } catch (error) {
        res.status(400)
        res.send({
            code:"INTERNAL_ERROR",
            message:"Failure trying to display movies!"
        })
    }
}

// =============================================
const addMovie = async (req,res) => {
    try {
        let data = {
            title:req.body.title,
            image:req.file.path
        }

        let {error} = movieValidation(data)

        if(error){
            res.status(400)
            res.send({
                code:"INPUT_VALUES",
                message:"Complete all the inputs!"
            })
        }else{

            // Saving image on cloudnary
            let result = await cloudinary.uploader.upload(req.file.path)

            // Saving movie data
            let movieData = {
                title: req.body.title.trim(),
                image_url:result.url,
                cloudinary_id:result.public_id
            }

            let movie = new Movies(movieData)
            await movie.save()

            res.status(200)
            res.send({
                code:"SUCCESS",
                message:"Movie saved!"
            })
        }

    } catch (error) {
        res.status(400)
        res.send({
            code:"INPUT_VALUES",
            message:"Complete all the inputs image and title!"
        })
    }
}

// =============================================
const aproveMovie = async (req,res) => {
    let id = req.params.id

    try {

        let filter = {_id:id}
        let update = {status:'aproved'}

        let selectedMovie = await Movies.findOneAndUpdate(filter,update)

        res.status(200)
        res.send({
            code:"SUCCESS",
            message:"Movie aproved!"
        })
    } catch (error) {
        res.status(400)
        res.send({
            code:"FAILURE",
            message:`The movie with id:${id} dont exist!`
        })
    }
}

// =============================================
const aprovedMovies = async (req,res) => {
    let movies = [];
    try {
        // Getting all the movies
        let receivedMovies = await Movies.find({});

        // Getting the aproved movies
        receivedMovies.forEach(movie => {
            if(movie.status === 'aproved'){
                movies.push(movie)
            }
        });

        // Validating if have itens 
        if(movies.length === 0){

            res.status(200)
            res.send({
                code:"SUCCESS",
                message:"Don't have aproved movies yet!"
            })

        }else{
            res.status(200)
            res.send(movies)
        }

    } catch (error) {
        res.status(200)
        res.send({
            code:"FAILURE",
            message:"Error trying to update status!"
        })
    }
}

// =============================================
const deleteMovie = async (req,res) => {
    let id = req.params.id

    try {
        // Getting the data
        let movie = await Movies.findById(id)

        // Deleting the Image
        await cloudinary.uploader.destroy(movie.cloudinary_id)

        // Deleting the data
        await Movies.findByIdAndDelete(id)

        res.status(200)
        res.send({
            code:"SUCCESS",
            message:"Movie deleted!"
        })
    } catch (error) {
        res.status(200)
        res.send({
            code:"FAILURE_DELETING",
            message:"Movie wasn't delete!"
        })
    }
}
module.exports = {HomePage,Login,newMovies,addMovie,aproveMovie,aprovedMovies,deleteMovie}