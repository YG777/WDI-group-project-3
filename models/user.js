const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true }
}, {
  timestamps: true
});

userSchema.virtual('password')
  .set(setPassword);
userSchema.virtual('passwordConfirmation')
  .set(setPasswordConfirmation);
userSchema.path('passwordHash')
  .validate(validatePasswordHash);
userSchema.path('email')
  .validate(validateEmail);
userSchema.methods.validatePassword = validatePassword;

userSchema.set('toJSON', {
  transform(doc, json) {
    json.id = json._id;
    delete json._id;
    delete json.__v;
    delete json.passwordHash;
    return json;
  }
});

module.exports = mongoose.model('User', userSchema);

function setPassword(password) {
  this._password = password;
  this.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmaiton = passwordConfirmation;
}

function validatePasswordHash() {
  if (this.isNew) {
    if (!this._password) return this.invalidate('password', 'A password is required');
    if (this._password.length < 6) return this.invalidate('password', 'Password must be longer than 6 characters');
    if (this._password !== this._passwordConfirmaiton) return this.invalidate('password', 'Passwords do not match');
  }
}

function validateEmail(email) {
  if (!validator.isEmail(email)) return this.invalidate('email', 'Not a valid email');
}

function validatePassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}
