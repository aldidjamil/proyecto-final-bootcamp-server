const router = require("express").Router()
const Cart = require('./../models/Cart.model')
const Product = require("../models/Product.model")
const { verifyToken } = require("../middlewares/verifyToken")

router.post("/createCart", verifyToken, (req, res, next) => {

    const { buy, totalPrice } = req.body
    const { _id: owner } = req.payload

    Cart
        .create({ buy, totalPrice })
        .then(response => res.json(response))
        .catch(err => next(err))
})



router.get("/getCart/:cart_id", verifyToken, (req, res, next) => {

    const { cart_id } = req.params

    Cart
        .findById(cart_id)
        .populate('buy.product')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put("/edit/:cart_id", verifyToken, (req, res, next) => {
    let { cart_id } = req.params
    const { buy } = req.body

    Cart
        .findByIdAndUpdate(cart_id, { buy }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))

})

router.delete("/delete/:cart_id", verifyToken, (req, res, next) => {

    const { cart_id } = req.params

    Cart
        .findByIdAndDelete(cart_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})



module.exports = router