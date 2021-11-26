const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// creating a Shema of 
//name, email, photo, password, passwordComfirm.
// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        validate: [validator.isEmail, 'Please fill a valid email address']
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        enum: ['user', 'guide', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'pleasee provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {

            // this only works on create or save!!!
            validator: function(el) {
                return el === this.password;
            },
            message: 'password are not the same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});


// HASHING PASSWORD
userSchema.pre('save', async function(next) {
   // only run this function if password was modify
    if (!this.isModified('password')) return next();

    //hash password with code of 12
    this.password = await bcrypt.hash(this.password, 12);
    //delete password comfirm field
    this.passwordConfirm = undefined;
    next();
});

// REMODIFYING PASSWORD FOR UPDAATING
userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
});
  
// MUTING USER THAT DELETED THEIR ACCOUNT
userSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
});

// CHECKING FOR CORRECT PASSWORD
userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
  
// SENDING TIMESTAMP CHANGE PASSWORD TO EMAIL 
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
};
  

// CREATING PASSWORD RESET TOKEN
userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
   // console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
};
const User = mongoose.model('User', userSchema);

module.exports = User;