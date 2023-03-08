const router = require("express").Router()

const productsRoutes = require("./products.routes")
router.use("/products", productsRoutes)

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const recipesRoutes = require("./recipes.routes")
router.use("/recipes", recipesRoutes)

module.exports = router