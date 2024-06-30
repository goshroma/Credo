const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');
const validator = require ('validator');

const UserSchema = new mongoose.Schema({
  username : {
    type : String,
    required : [true, 'Please provide a username'],
    trim : true,
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username must not exceed 30 characters']

  },
  email: {
    type : String,
    required : [true, 'Please provide an email-id'],
    unique : true,
    lowercase : true,
    validate :[validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must have at least 8 characters'],
    validate: {
      validator: function(password) {
        
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password);
      },
      message: 'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'
    }
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide your date of birth'],
    validate: {
      validator: function(value) {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      },
      message: 'You must be at least 18 years old to register'
    }
  },
}, {
  timestamps: true
}
)
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);


