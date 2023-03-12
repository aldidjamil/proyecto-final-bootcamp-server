const router = require("express").Router()
const Recipe = require('./../models/Recipe.model')
const fileUploader = require('./../config/cloudinary.config')

router.get("/getAllRecipes", (req, res) => {

  Recipe
    .find()
    .sort({ title: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.get("/Recipe/:Recipe_id", (req, res, next) => {

  const { Recipe_id } = req.params

  Recipe
    .findById(Recipe_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/addRecipe", (req, res, next) => {
  const { title, steps, ingredients, imageUrl } = req.body

  Recipe
    .create({ title, steps, imageUrl, ingredients })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.delete('/delete/:_id', (req, res, next) => {

  const { _id } = req.params

  Recipe
    .findByIdAndDelete(_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.put('/edit/:_id', (req, res, next) => {

  let { _id } = req.params
  const { title, steps, imageUrl, ingredients, owner } = req.body


  Recipe
    .findByIdAndUpdate(_id, { title, steps, ingredients, imageUrl, owner })
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = router