import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


const userSchema = new Schema({
    name: { type: 'String', required: true },
    email: { type: 'String', required: true },
    password: { type: 'String', required: true },
    cuid: { type: 'String', required: true },
    role: {
        type: String,
        enum: ['user', 'manager', 'admin'],
        default: 'user'
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
});

// Pre-save of user to database, hash password if password is modified or new
userSchema.pre('save', function(next) {
    const user = this;
    const SALT_FACTOR = 5;

    if(!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if(err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

// Method to compare password for login
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}

// Static Methods
userSchema.statics.findByCuid = function(cuid, cb) {
  return this.find({ cuid: cuid }, cb);
};


export default mongoose.model('User', userSchema);
