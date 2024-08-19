import Category from "../Models/Category.js"
import asyncHandler from "express-async-handler"

// Public controllers

// @desc get all categories
// @route GET /api/categories
// @access PUBLIC 
const getCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({})
        res.json(categories)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


// Admin controllers

// @desc create new category
// @route POST /api/categories
// @access PRIVATE ADMIN 
const createCategory = asyncHandler(async (req, res) => {
    try {
        // get title from req.body
        const { title } = req.body
        // create new category
        const category = await Category({
            title,
        })
        // save category to db
        const createdCategory = await category.save()
        // send new category to client
        res.status(201).json(createdCategory)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// @desc update category
// @route PUT /api/categories/:id
// @access PRIVATE ADMIN 
const updateCategory = asyncHandler(async (req,res)=> {
    try {
        // get category id from req.params
        const category = await Category.findById(req.params.id)
        if(category){
            // update category title
            category.title = req.body.title || category.title
            // save category to db
            const updatedCategory = await category.save()
            // send updated category to client
            res.status(200).json(updatedCategory)
        }
        else {
            res.status(404).json({message: "Category not found"})
        }
    } catch(error){
        res.status(400).json({message: error.message})
    }
})

// @desc delete category
// @route DELETE /api/categories/:id
// @access PRIVATE ADMIN 
const deleteCategory = asyncHandler(async (req,res)=> {
    try {
        // get category id from req.params
        const category = await Category.findById(req.params.id)
        if(category){
            // delete category from db
            await category.deleteOne()
            // send deleted category to client
            res.json({message: "Category removed"})
        }
        else {
            res.status(404).json({message: "Category not found"})
        }
    } catch(error){
        res.status(400).json({message: error.message})
    }
})

export {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}