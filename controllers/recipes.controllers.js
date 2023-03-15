const Recipe = require('./../models/Recipe.model')

const getAllRecipes = (req, res) => {

    Recipe
        .find()
        .sort({ title: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getRecipeOwner = (req, res, next) => {
    const { _id: owner } = req.payload

    Recipe
        .find({ owner })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getRecipeById = (req, res, next) => {

    const { recipe_id } = req.params

    Recipe
        .findById(recipe_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const addRecipe = (req, res, next) => {

    const { title, steps, imageUrl, ingredients } = req.body
    const { _id: owner } = req.payload

    Recipe
        .create({ title, steps, imageUrl, owner, ingredients })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const deleteRecipe = (req, res, next) => {
    const { recipe_id } = req.params

    Recipe
        .findByIdAndDelete(recipe_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const editRecipe = (req, res, next) => {

    let { recipe_id } = req.params
    const { title, steps, imageUrl, owner, ingredients } = req.body

    Recipe
        .findByIdAndUpdate(recipe_id, { title, steps, ingredients, owner, imageUrl })
        .then(response => res.json(response))
        .catch(err => next(err))
}

module.exports = { getAllRecipes, getRecipeOwner, getRecipeById, addRecipe, deleteRecipe, editRecipe }