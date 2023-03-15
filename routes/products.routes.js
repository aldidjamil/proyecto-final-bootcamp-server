const router = require("express").Router()
const Product = require('./../models/Product.model')
const { verifyToken } = require("../middlewares/verifyToken")
const { getAllProducts, getOwnerProduct, getProductId, addProduct, editProduct, updateStock, deleteProduct } = require("../controllers/products.controller")

router.get("/getAllProducts", getAllProducts)
router.get("/owner", verifyToken, getOwnerProduct)
router.get("/:product_id", getProductId)
router.post("/addProduct", verifyToken, addProduct)
router.put("/edit/:product_id", editProduct)
router.put("/updateStock/:product_id", updateStock)
router.delete('/delete/:product_id', deleteProduct)

module.exports = router