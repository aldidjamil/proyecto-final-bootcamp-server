const User = require("../models/User.model")

const getAllUsers = (req, res, next) => {
    User
        .find()
        .sort({ title: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const signup = (req, res, next) => {
    const { email, password, username, cart } = req.body

    User
        .create({ email, password, username, cart })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
}

const login = (req, res, next) => {

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
}

const verify = (req, res, next) => {
    res.json(req.payload)
}

const edit = (req, res, next) => {
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
        .catch(err => next(err))
}

const getUserById = (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const deleteUser = (req, res, next) => {
    const { _id } = req.params

    User

        .findByIdAndDelete({ _id })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const updateToken = (req, res, next) => {
    const user_id = req.payload._id
    User
        .findById(user_id)
        .then(user => {
            const token = user.signToken()
            res.json(token)
                .catch(err => next(err))
        })
}

module.exports = { getAllUsers, signup, login, verify, edit, getUserById, deleteUser, updateToken }