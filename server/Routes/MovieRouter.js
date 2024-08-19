import express from "express";
import {
    getMovieById,
    getMovies,
    getRandomMovies,
    getTopRatedMovies,
    importMovies,
    createMovieReview,
    updateMovie,
    deleteMovie,
    deleteAllMovies,
    createMovie,
} from "../Controllers/MoviesController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// Public routes
router.post("/import", importMovies)
router.get("/", getMovies)
router.get("/:id", getMovieById)
router.get("/rated/top", getTopRatedMovies)
router.get("/random/all", getRandomMovies)



//Private routes
router.post("/:id/reviews", protect, createMovieReview)


// Admin routes
router.put("/:id", protect, admin, updateMovie)
router.delete("/:id", protect, admin, deleteMovie)
router.delete("/", protect, admin, deleteAllMovies)
router.post("/", protect, admin, createMovie)
export default router;