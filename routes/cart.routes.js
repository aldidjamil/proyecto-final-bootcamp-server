const router = require("express").Router()
const Cart = require('./../models/Cart.model')
const Product = require("../models/Product.model")
const User = require("../models/User.model")
const { verifyToken } = require("../middlewares/verifyToken")

router.post("/createCart", verifyToken, (req, res, next) => {

    const { buy, totalPrice } = req.body
    const { _id: owner } = req.payload

    Cart
        .create({ buy, totalPrice })
        .then(cart => User.findByIdAndUpdate(owner, { cart: cart._id }, { new: true }))
        .then(user => res.json(user))
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

router.put("/editQuantity/:cart_id", verifyToken, (req, res, next) => {
    let { cart_id } = req.params
    const { buy } = req.body

    Cart
        .findByIdAndUpdate(cart_id, { buy }, { new: true })
        .then(updatedCart => {
            return updatedCart.updatePrices()
        })
        .then(cart => cart.save())
        .then(response => res.status(200).json(response))
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