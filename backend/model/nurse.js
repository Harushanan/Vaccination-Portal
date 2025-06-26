const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: String,
    nursingId: String,
    role:{type:String ,default:"nurse"}
});



const DeleteNurseSchema = new mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    nursingId: String,
    role: { type: String, default: "nurse" },
    reason: String,
    date:String
});

module.exports = mongoose.model('DeletedNurse', DeleteNurseSchema);


const NurseModel = mongoose.model('Nurse', nurseSchema);
const NurseDeleteModel = mongoose.model('DeleteNurse', DeleteNurseSchema);

module.exports = {NurseModel , NurseDeleteModel};
