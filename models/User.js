// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    samparkKaryakar: { type: String, required: true },
    isKaryakar: { type: Boolean, required: true },
    karyakarTypesId: { type: [String], required: true },
    adultMale: { type: Number, required: true },
    adultFemale: { type: Number, required: true },
    childMale: { type: Number, required: true },
    childFemale: { type: Number, required: true },
    skillIds: { type: [String], required: true },
    BAPSrelatedInfo: { type: [String], required: true },
    notes: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export default User;
