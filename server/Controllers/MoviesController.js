
import Movie from "../Models/Movie.js"
import { MoviesData } from "../Data/MoviesData.js"
import asyncHandler from "express-async-handler"
// Public controllers

// @desc import movies
// @route POST /api/movies/import
// @access PUBLIC 
const importMovies = asyncHandler(async (req, res) => {
    // delete all movie document file
    await Movie.deleteMany({})
    // insert movies from MoviesData
    const movies = await Movie.insertMany(MoviesData)
    res.status(201).json(movies)
})

// @desc get all movies (movies list)
// @route GET /api/movies
// @access PUBLIC 
const getMovies = asyncHandler(async (req, res) => {
    try {
        // filter movies by category, time, language, rate, year, recent to search
        const { category, time, language, rate, year, search } = req.query
        let query = {
            ...(category && { category }),
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(search && { name: { $regex: search, $options: "i" } }),
        }

        // load more movies functionality
        const page = Number(req.query.pageNumber) || 1; // if pageNumber is not provided in query, set it to 1
        const limit = 12; // 10 movies per page
        const skip = (page - 1) * limit // skip 10 movies per page
        // find movies by query, skip and limit
        // const movies = await Movie.find(query).sort({'createdAt': -1 }).skip(skip).limit(limit)
        const movies = await Movie.find(query)
        // .sort({ '_id': 1 })
        .skip(skip).limit(limit)
        // .sort((recent===true) ? {'createdAt':-1} : {})

        // get total number of movies
        const count = await Movie.countDocuments(query)

        // send response with movies and total number of movies
        res.json({
            movies,
            page,
            pages: Math.ceil(count / limit), // total pages
            totalMovies: count // total movies
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// @desc get movies by id
// @route GET /api/movies/:id
// @access PUBLIC 
const getMovieById = asyncHandler(async (req, res) => {
    try {
        // find movie by id in db
        const movie = await Movie.findById(req.params.id)
        // if movie exists, send response with to client
        if (movie) {
            res.json(movie)
        }
        // else not found, send 404 status
        else {
            res.status(404)
            throw new Error("Movie not found")
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

// @desc get top rated movies
// @route GET /api/movies/rated/top
// @access PUBLIC 
const getTopRatedMovies = asyncHandler(async (req, res) => {
    try {
        // find top rated movies by rate in descending order
        const movies = await Movie.find({}).sort({ rate: -1 })
        //send top rated to client
        res.json(movies)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

// @desc get random movies
// @route GET /api/movies/random/all
// @access PUBLIC 
const getRandomMovies = asyncHandler(async (req, res) => {
    try {
        // find random movies
        const movies = await Movie.aggregate([{ $sample: { size: 8 } }])
        //send random movies to client
        res.json(movies)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})


///// PRIVATE CONTROLLERS
// @desc create movie review
// @route POST /api/movies/:id
// @access Private
const createMovieReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    try {
        // find movie by id in db
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            // check if the user already reviewed the movie
            const alreadyReviewed = movie.reviews.find(review => review.userId.toString() === req.user._id.toString())
            // if user already reviewed the movie, send 400 status
            if (alreadyReviewed) {
                res.status(400)
                throw new Error("You already reviewed this movie")
            }
            // else create new review
            const review = {
                userName: req.user.fullName,
                userId: req.user._id,
                userImage: req.user.image,
                rating: Number(rating),
                comment: comment,
            }
            // push new review to reviews array
            movie.reviews.push(review)
            // increase number of reviews
            movie.numberOfReviews = movie.reviews.length;

            // calculate new rating
            movie.rate = movie.reviews.reduce((acc, i) => i.rating + acc, 0) / movie.reviews.length

            // save movie in db
            await movie.save()
            // send new movie to client
            res.status(201).json({ message: "Review added" })

        }
        else {
            res.status(404)
            throw new Error("Movie not found")
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

///// ADMIN CONTROLLERS
// @desc update movie
// @route PUT /api/movies/:id
// @access Private Admin
const updateMovie = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts
        } = req.body


        // find movie by id in db
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            // update movie data
            movie.name = name || movie.name;
            movie.desc = desc || movie.desc;
            movie.image = image || movie.image;
            movie.titleImage = titleImage || movie.titleImage;
            movie.rate = rate || movie.rate;
            movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
            movie.category = category || movie.category;
            movie.rate = rate || movie.rate;
            movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
            movie.category = category || movie.category;
            movie.time = time || movie.time;
            movie.language = language || movie.language;
            movie.year = year || movie.year;
            movie.video = video || movie.video;
            movie.casts = casts || movie.casts;

            // save movie in db
            const updatedMovie = await movie.save()
            // send updated movie to client
            res.status(200).json(updatedMovie)
        }
        else {
            res.status(404)
            throw new Error("Movie not found")
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// @desc delete movie
// @route DELETE /api/movies/:id
// @access Private Admin
const deleteMovie = asyncHandler(async (req, res) => {
    try {
        // find movie by id in db
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            await movie.deleteOne()
            res.status(200).json({ message: "Movie removed" })
        }
        // else not found, send 404 status
        else {
            res.status(404)
            throw new Error("Movie not found")
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

// @desc delete all movie
// @route DELETE /api/movies
// @access Private Admin
const deleteAllMovies = asyncHandler(async (req, res) => {
    try {
        // delete all movies 
        await Movie.deleteMany({})
        res.json({ message: "All movies removed" })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

// @desc create movie
// @route POST /api/movies
// @access Private Admin
const createMovie = asyncHandler(async (req,res)=> {
    try {
        const {
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
        } = req.body

        // create new movie
        const movie = new Movie({
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
            userId: req.user._id,

        })
        // save movie in db
        if(movie){
            const createdMovie = await movie.save()
            res.status(201).json(createdMovie)
        }      
        else {
            res.status(404)
            throw new Error("Invalid movie data")
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
export {
    importMovies, getMovies, getMovieById, getTopRatedMovies, getRandomMovies, createMovieReview, 
    updateMovie, deleteMovie, deleteAllMovies, createMovie,
}
