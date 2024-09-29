const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'logistic', 'product'], default: 'user' },
  name: String,
  email: { type: String, unique: true, required: true },
  location: String,
  joined: { type: Date, default: Date.now },
  ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: Number }],
  trucks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Truck' }],
},
  {
    timestamps: true,
  });

userSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) return 0;
  const total = this.ratings.reduce((sum, rate) => sum + rate.rating, 0);
  return total / this.ratings.length;
};

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// Password match method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
