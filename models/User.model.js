const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'El email de usuario es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'La contraseña de usuario es obligatoria']
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

const User = model("User", userSchema)

module.exports = User