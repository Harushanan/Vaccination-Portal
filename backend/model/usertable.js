const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


const loginRegister = new mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    password: String,
    address: String,
    role:{type:String ,default:"customer"}
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


async function createPermanentAdmin() {
    const adminEmail = "admin@my2025gmail.com"; 
    const existingAdmin = await UserModel.findOne({ email: adminEmail });

    const hashedPassword = await bcrypt.hash("admin123", 10)

    if (!existingAdmin) {
        const adminUser = new UserModel({
            username: "KajaAdmin",
            email: adminEmail,
            phone: "07712*****",
            password:hashedPassword,
            address: "Admin Office",
            role: "admin"
        });

        await adminUser.save();
        console.log("Permanent admin created successfully!");
    } else {
        console.log("Admin already exists.");
    }
}



const UserModel = mongoose.model("loginRegister", loginRegister);
const DeletedUserModel = mongoose.model("deletuser", deletuser);

module.exports = { UserModel, DeletedUserModel  , createPermanentAdmin};


