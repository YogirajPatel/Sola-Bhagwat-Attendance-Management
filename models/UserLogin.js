// models/User.mjs
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userLogINSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

userLogINSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userLogINSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const UserLogIn = mongoose.model('UserLogin', userLogINSchema);

export default UserLogIn;
