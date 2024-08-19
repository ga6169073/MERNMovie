import express from 'express';
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../Controllers/CategoriesController.js";
import { protect, admin } from '../middlewares/Auth.js';

const router = express.Router();

// Public routes
router.get("/", getCategories)

// Admin routes
router.post("/", protect, admin, createCategory)
router.put("/:id", protect, admin, updateCategory)
router.delete("/:id", protect, admin, deleteCategory)

export default router;