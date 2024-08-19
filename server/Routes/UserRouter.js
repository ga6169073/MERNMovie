import express from "express";
import {
    addLikedMovies,
    changeUserPassword,
    deleteLikedMovies,
    deleteUserProfile,
    deleteUser,
    getLikedMovies,
    getUsers,
    loginUser,
    registerUser,
    updateUserProfile
} from "../Controllers/UserController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// Public routes

router.post("/", registerUser)
router.post("/login", loginUser)

//Private routes
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile)
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikedMovies)
router.post("/favorites", protect, addLikedMovies)
router.delete("/favorites", protect, deleteLikedMovies)


// Admin routes
router.get("/", protect, admin, getUsers)
router.delete("/:id", protect, admin, deleteUser)
export default router;