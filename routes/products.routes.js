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

router.get("/:product_id", (req, res, next) => {

  const { product_id } = req.params

  Product
    .findById(product_id)
    .populate("owner")
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

router.put("/edit/:product_id", (req, res, next) => {

  let { product_id } = req.params
  const { title, description, format, imageUrl, stock, owner, price } = req.body


  Product
    .findByIdAndUpdate(product_id, { title, description, format, imageUrl, stock, owner, price })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.put("/updateStock/:product_id", (req, res, next) => {

  let { product_id } = req.params
  const { stock } = req.body


  Product
    .findByIdAndUpdate(product_id, { stock })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.delete('/delete/:product_id', (req, res, next) => {

  const { product_id } = req.params

  Product
    .findByIdAndDelete(product_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = router