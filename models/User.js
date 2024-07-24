// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String },
    mobile: { type: String, required: true },
    address: { type: String },
    samparkKaryakar: { type: String },
    isKaryakar: { type: Boolean },
    karyakarTypesId: { type: [Number] },
    adultMale: { type: Number },
    adultFemale: { type: Number },
    childMale: { type: Number },
    childFemale: { type: Number },
    skillIds: { type: [Number] },
    BAPSrelatedInfo: { type: [Number] },
    notes: { type: String }
});

const User = mongoose.model('User', userSchema);

export default User;
