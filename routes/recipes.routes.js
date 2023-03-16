const router = require("express").Router()
const Recipe = require('./../models/Recipe.model')
const { verifyToken } = require("../middlewares/verifyToken")
const { getAllRecipes, getRecipeByOwner, getRecipeById, addRecipe, deleteRecipe, editRecipe } = require("../controllers/recipes.controllers")

router.get("/getAllRecipes", getAllRecipes)
router.get("/owner", verifyToken, getRecipeByOwner)
router.get("/Recipe/:recipe_id", getRecipeById)
router.post("/addRecipe", verifyToken, addRecipe)
router.delete('/delete/:recipe_id', deleteRecipe)
router.put('/edit/:recipe_id', editRecipe)

module.exports = router