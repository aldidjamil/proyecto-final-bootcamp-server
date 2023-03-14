const router = require("express").Router()

const productsRoutes = require("./products.routes")
router.use("/products", productsRoutes)

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const recipesRoutes = require("./recipes.routes")
router.use("/recipes", recipesRoutes)

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

const cartRoutes = require("./cart.routes")
router.use("/cart", cartRoutes)

module.exports = router