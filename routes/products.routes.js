const router = require("express").Router()
const Product = require('./../models/Product.model')
const { verifyToken } = require("../middlewares/verifyToken")


router.get("/getAllProducts", (req, res) => {

  Product
    .find()
    .sort({ title: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.get("/owner", verifyToken, (req, res, next) => {

  const { _id: owner } = req.payload

  Product
    .find({ owner })
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



router.post("/addProduct", verifyToken, (req, res, next) => {


  const { title, description, format, imageUrl, stock, price } = req.body
  const { _id: owner } = req.payload

  Product
    .create({ title, description, format, imageUrl, owner, stock, price })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.put("/edit/:Product_id", (req, res, next) => {

  let { Product_id } = req.params
  const { title, description, format, imageUrl, stock, owner, price } = req.body


  Product
    .findByIdAndUpdate(Product_id, { title, description, format, imageUrl, stock, owner, price })
    .then(response => res.json(response))
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