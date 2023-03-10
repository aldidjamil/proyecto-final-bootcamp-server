const router = require("express").Router()
const Product = require('./../models/Product.model')
const fileUploader = require('./../config/cloudinary.config')
const { findById } = require("./../models/Product.model")

router.get("/getAllProducts", (req, res) => {

  Product
    .find()
    .sort({ title: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.get("/:Product_id", (req, res, next) => {

  const { Product_id } = req.params

  Product
    .findById(Product_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/addProduct", fileUploader.single('imageUrl'), (req, res, next) => {

  // const { title, description, format, owner, stock, imageUrl } = req.body

  // Product
  //   .create({ title, description, format, imageUrl, owner, stock })
  //   .then(response => res.json(response))
  //   .catch(err => next(err))
  let imageUrl = req.file?.path
  const { title, description, format, owner, stock, } = req.body

  Product
    .create({ title, description, imageUrl, format, owner, stock })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.put("/edit/:Product_id", fileUploader.single('imageUrl'), (req, res, next) => {

  let { Product_id } = req.params
  let imageUrl = req.file?.path
  const { title, description, format, stock, owner } = req.body

  Product
    .findById(Product_id)
    .then(product => {
      if (imageUrl === '') { imageUrl = product.imageUrl }
      Product
        .findByIdAndUpdate(Product_id, { title, description, format, imageUrl, stock, owner })
        .then(response => res.json(response))
    })
    .catch(err => next(err))
})

router.put("/updateStock/:Product_id", (req, res, next) => {

  let { Product_id } = req.params
  const { stock } = req.body


  Product
    .findByIdAndUpdate(Product_id, { stock })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.delete('/delete/:Product_id', (req, res, next) => {

  const { Product_id } = req.params

  Product
    .findByIdAndDelete(Product_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})



module.exports = router