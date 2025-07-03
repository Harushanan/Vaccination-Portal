const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


const loginRegister = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  password: String,
  address: String,
  Image: String, // <-- Add type for image (e.g., file path or URL)
  role: { type: String, default: "customer" }
});



const deletuser = new mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    address: String,
    reason: String,
    removeby:String,
    date:String
});

const admin = new mongoose.Schema({
    email: String,
    password: String,
    role:{type:String ,default:"admin"}
});


async function createPermanentAdmin() {
    const adminEmail = "admin@my2025gmail.com"; 
    const existingAdmin = await AdminModel.findOne({ email: adminEmail });

    const hashedPassword = await bcrypt.hash("admin123", 10)

    if (!existingAdmin) {
        const adminUser = new AdminModel({
            email: adminEmail,
            password:hashedPassword,
            role: "admin"
        });

        await adminUser.save();
        console.log("Permanent admin created successfully!");
    } else {
        console.log("Admin already exists.");
    }
}



const UserModel = mongoose.model("PatientList", loginRegister);
const AdminModel = mongoose.model("AdminList", loginRegister);
const DeletedUserModel = mongoose.model("RemovePatientList", deletuser);

module.exports = { UserModel, DeletedUserModel  , createPermanentAdmin , AdminModel};


