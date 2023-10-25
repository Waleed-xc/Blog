const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const validator = require('validator')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, 
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  }
})
userSchema.statics.signup = async function(username ,email, password) {
  if ( !username || !email || !password ) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }
  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('Email already in use')
  }
  const duplicateUsername = await this.findOne({ username });
  if (duplicateUsername) {
    throw Error('Username already in use');
  }
  const salt = await bcryptjs.genSalt(10)
  const hash = await bcryptjs.hash(password, salt)
  const user = await this.create({ username, email, password: hash })
  return user
}
userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }
  const match = await bcryptjs.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }
  return user
}


module.exports = mongoose.model("User", userSchema);

