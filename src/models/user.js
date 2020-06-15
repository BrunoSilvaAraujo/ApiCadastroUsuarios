const mongoose = require('../database/index');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    criadoEm:{
        type: Date,
        default: Date.now,
    }
});
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});
const User = mongoose.model('User', UserSchema);

module.exports = User;