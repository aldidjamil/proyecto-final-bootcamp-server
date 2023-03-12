const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'El email de usuario es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'La contraseña de usuario es obligatoria'],
    minlength: [4, 'La longitud de la contraseña debe ser superior a 4 caracteres']
  },
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio']
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN', 'EDITOR'],
    default: 'USER'
  }

},
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {
  const { _id, username, email, role } = this
  const payload = { _id, username, email, role }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

const User = model("User", userSchema)

module.exports = User