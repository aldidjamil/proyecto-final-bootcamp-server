const router = require("express").Router()

const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10

const jwt = require('jsonwebtoken')
const { verifyToken } = require("../middlewares/verifyToken")
const { response } = require("express")

router.get('/getAllUsers', (req, res) => {
  User
    .find()
    .sort({ title: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.post('/signup', (req, res, next) => {

  const { email, password, username } = req.body

  if (password.length < 2) {
    res.status(400).json({ message: 'Password must have at least 3 characters' })
    return
  }

  User
    .findOne({ email })
    .then((foundUser) => {

      if (foundUser) {
        res.status(400).json({ message: "User already exists." })
        return
      }

      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = bcrypt.hashSync(password, salt)

      return User.create({ email, password: hashedPassword, username })
    })
    .then(() => res.sendStatus(201))
    .catch(err => next(err))
})



router.post('/login', (req, res, next) => {

  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User
    .findOne({ email })
    .then((foundUser) => {

      if (!foundUser) {
        res.status(401).json({ message: "User not found." })
        return;
      }

      if (bcrypt.compareSync(password, foundUser.password)) {

        const { _id, email, username } = foundUser;
        const payload = { _id, email, username }

        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        )

        res.status(200).json({ authToken })
      }
      else {
        res.status(401).json({ message: "Incorrect password" });
      }

    })
    .catch(err => next(err));
})

router.get('/verify', verifyToken, (req, res, next) => {
  res.json(req.payload)
})

router.delete('/delete/:_id', (req, res, next) => {
  const { _id } = req.params

  User

    .findByIdAndDelete({ _id })
    .then(response => res.json(response))
    .catch(err => next(err))

})

router.put('/edit/:_id', (req, res, next) => {
  let { _id } = req.params
  const { email, password, username } = req.body

  User

    .findByIdAndUpdate(_id, { email, password, username })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.get("/:user_id", (req, res, next) => {

  const { user_id } = req.params

  User
    .findById(user_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = router