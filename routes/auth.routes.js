const router = require("express").Router()
const User = require("../models/User.model")
const { verifyToken } = require("../middlewares/verifyToken")
const { getAllUsers, signup, login, verify, edit, getUserById, deleteUser, updateToken } = require("../controllers/auth.controller")


router.get('/getAllUsers', getAllUsers)
router.post('/signup', signup)
router.post('/login', login)
router.get('/verify', verifyToken, verify)
router.put('/edit/:user_id', edit)
router.get("/:user_id", getUserById)
router.delete('/delete/:_id', deleteUser)
router.get('/updateToken', verifyToken, updateToken)

module.exports = router