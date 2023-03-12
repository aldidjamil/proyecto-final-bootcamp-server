const router = require("express").Router()
const User = require("../models/User.model")
const { verifyToken } = require("../middlewares/verifyToken")


router.get('/getAllUsers', (req, res) => {
  User
    .find()
    .sort({ title: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.post('/signup', (req, res, next) => {

  const { email, password, username } = req.body

  User
    .create({ email, password, username })
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
        return
      }

      if (foundUser.validatePassword(password)) {

        const authToken = foundUser.signToken()
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


router.put('/edit/:user_id', (req, res, next) => {
  let { user_id } = req.params
  const { email, password, username } = req.body

  User

    .findByIdAndUpdate(user_id, { email, password, username })
    .then((foundUser) => {
      if (foundUser) {
        const authToken = foundUser.signToken()
        res.status(200).json({ authToken })
      }
    })
    // .then(response => res.json(response))
    .catch(err => next(err))
})

router.get("/:user_id", (req, res, next) => {

  const { user_id } = req.params

  User
    .findById(user_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.delete('/delete/:_id', (req, res, next) => {
  const { _id } = req.params

  User

    .findByIdAndDelete({ _id })
    .then(response => res.json(response))
    .catch(err => next(err))

})
module.exports = router