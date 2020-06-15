const mongoose = require('../database/index');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(password, 10);
    password = hash;

    next();
});
UserSchema.pre('save', async function(next) {
    const agora = Date.now;
    if(!createAt)
        createAt = agora;
        
    next();
});


const User = mongoose.model('User', UserSchema);

module.exports = User;