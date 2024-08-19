import asyncHandler from "express-async-handler";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body
    try {
        // check user existed
        const userExisted = await User.findOne({ email })
        if (userExisted) {
            res.status(400);
            throw new Error("User already exists")
        }

        // create user

        //hashPass
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // create user in db
        const user = await User.create({
            fullName,
            email,
            password: hashPassword,
            image,
        })

        // if user created successfully, res
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        }
        else {
            res.status(400);
            throw new Error("Invalid user data")
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        // find user in db
        const user = await User.findOne({ email })
        // check if user existed compare with hashed pass then send user data and token back to client

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        }
        // if user not found or password not match send error message
        else {
            res.status(401);
            throw new Error("Invalid email or password")
        }
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})

////// PRIVATE CONTROLLER

// @desc update user profile
// @route PUT /api/users/profile
// @access PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, image } = req.body;
    try {
        // find user in db
        const user = await User.findById(req.user._id)
        //if user existed update user data and save it in db
        if (user) {
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;
            const updateUser = await user.save();
            // send updated user data and token to client
            res.json({
                _id: updateUser._id,
                fullName: updateUser.fullName,
                email: updateUser.email,
                image: updateUser.image,
                isAdmin: updateUser.isAdmin,
                token: generateToken(updateUser._id),
            })
        }
        // else send error message 
        else {
            res.status(404);
            throw new Error("User not found")
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

// @desc Delete user profile
// @route DELETE /api/users/profile
// @access PRIVATE
const deleteUserProfile = asyncHandler(async (req, res) => {
    try {
        // find user in db
        const user = await User.findById(req.user._id);
        //if user existed delete user from db
        if (user) {
            // if user is admin throw message //deleted successfully, send success message to client
            if (user.isAdmin) {
                res.status(400)
                throw new Error("Can't delete admin user")
            }

            //else delete user from db
            await user.deleteOne();
            res.json({ message: "User deleted successfully" })
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found")
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// @desc Change user password
// @route PUT /api/users/password
// @access PRIVATE
const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    try {
        // find user in db
        const user = await User.findById(req.user._id);
        //if user existed, compare old password with hashed password then update user password and save in db
        // if (user && (await bcrypt.compare(oldPassword, newPassword))) {
        //     res.status(401)
        //     throw new Error("Old and new password need to different")
        // } else 
        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            //hash new password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword
            await user.save()
            res.json({ message: "Password changed successfully" })
        }

        // else send error message
        else {
            res.status(401)
            throw new Error("Invalid old password")
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// @desc Get all liked movies
// @route GET /api/users/favorites
// @access PRIVATE
const getLikedMovies = asyncHandler(async (req, res) => {
    try {
        // find user in db
        const user = await User.findById(req.user._id).populate("likedMovies")
        // if user existed, send liked movies to client
        if (user) {
            res.json(user.likedMovies)
        }
        // else send error message
        else {
            res.status(404)
            throw new Error("User not found")
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// @desc Add liked movie to favorites
// @route POST /api/users/favorites
// @access PRIVATE
const addLikedMovies = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    try {
        // find user in db
        const user = await User.findById(req.user._id)
        // if user existed, add movie to liked movies and save it in db
        if (user) {
            // // check if movie already liked
            // const isMovieLiked = user.likedMovies.find(
            //     (movie) => movie.toString() === movieId
            // )

            // if movie already liked, send error message
            if (user.likedMovies.includes(movieId)) {
                res.status(400)
                throw new Error("Movie already liked")
            }
            // else add movie to liked movie and save it to db
            user.likedMovies.push(movieId)
            await user.save()
            res.json(user.likedMovies)
        }
        // else send error message
        else {
            res.status(404)
            throw new Error("Movie not found")
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

// @desc Delete all liked movie 
// @route DELETE /api/users/favorites
// @access PRIVATE
const deleteLikedMovies = asyncHandler(async (req, res) => {
    try {
        // find user in db
        const user = await User.findById(req.user._id)
        // if user existed, delete all liked movies and save it to db 
        if (user) {
            user.likedMovies = []
            await user.save()
            res.json({ message: "Your liked movies deleted successfully" })
        }
        // else send error message
        else {
            res.status(404)
            throw new Error("User not found")
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


///// ADMIN CONTROLLER /////
// @desc Get all users
// @route GET /api/users
// @access PRIVATE/ADMIN
const getUsers = asyncHandler(async (req, res) => {
    try {
        // find all users in db
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// @desc DELETE users
// @route GET /api/users
// @access PRIVATE/ADMIN
const deleteUser = asyncHandler(async (req, res) => {
    try {
        // find user in db
        const user = await User.findById(req.params.id)
        // if user existed, delete user from db
        if (user) {
            // if user is admin throw error message
            if (user.isAdmin) {
                res.status(400)
                throw new Error("Can't delete admin user")
            }
            // else delete user from db
            await user.deleteOne()
            res.json({ message: "User deleted successfully" })
        }
        else {
            res.status(404)
            throw new Error("User not found")
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
export {
    registerUser,
    loginUser,
    updateUserProfile,
    deleteUserProfile,
    changeUserPassword,
    getLikedMovies,
    addLikedMovies,
    deleteLikedMovies,
    getUsers,
    deleteUser,
};
