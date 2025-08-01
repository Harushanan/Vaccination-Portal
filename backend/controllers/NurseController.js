const {NurseModel , NurseDeleteModel} = require('../model/nurse')
const {CenterModel} = require('../model/center')
const BookingModel = require('../model/booking')
const {UserModel} = require('../model/usertable')
const {VaccineModel} = require('../model/vaccine')

const bcrypt = require('bcryptjs');

//--------------- Login details ------------------- //
const nuserloginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await NurseModel.findOne({ email }); //02

        if (!user) {
            return res.json({ message: "Invalid user" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({ message: "Successfullogin" , role: user.role , getuser: user});
        }
        
        else {
            res.json({ message: "Invalidcredentials" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error. Please try again." });
    }
};

//--------------- Signup details ------------------- //
const nursesignupuser = async (req, res) => {
    try {
        const { email, password, nurseid } = req.body;
        console.log("Nurse Details:", req.body);

        // Check if email already exists
        const userExists = await NurseModel.findOne({ email });

        // Check if nurse ID already exists (should be checking the correct field name)
        const nurseIdExists = await NurseModel.findOne({ nursingId: nurseid });

        if (nurseIdExists) {
            return res.json({ message: "NurseIdAlreadyExists" });
        }

        if (userExists) {
            return res.json({ message: "EmailAlreadyExists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user
        await NurseModel.create({ 
            ...req.body, 
            password: hashedPassword, 
            nursingId: nurseid // ensure this matches your schema
        });

        res.json({ message: "UserCreated" });

    } catch (err) {
        console.error("Signup error:", err);
        res.status(400).json({ error: "Error creating user. Please try again." });
    }
};


const nursedeatiles = async (req, res) => {
    try {
        const users = await NurseModel.find(); 
        res.json(users);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Database connection failed" });
    }
};

const deletenurse = async (req, res) => {
    try {
        const { email, reason } = req.body;
        const user = await NurseModel.findOne({ email });
        console.log("Delete User: ", user);
        
        if (user) {
            await NurseDeleteModel.create({ 
                username: user.username, 
                email: user.email,
                phone: user.phone,
                 nursingId: user.nursingId,
                reason: reason ,
                removeby:"Admin",
                date: new Date().toISOString().split('T')[0]
            });
    
            const deletedUser = await NurseModel.findOneAndDelete({ email });
    
            if (deletedUser) {
                return res.json({ message: 'UserDeleted' });
            } else {
                return res.status(404).json({ message: 'UserNotFound' });
            }
        } else {
            return res.status(404).json({ message: 'UserNotFound' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

const deletenursedeatiles = async (req, res) => {
    try {
        const users = await NurseDeleteModel.find(); //04
        res.json(users);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Database connection failed" });
    }
};


const bookingData = async (req, res) => {
  try {
    const { nurseid } = req.params;
   
    
    const hospital = await CenterModel.findOne({nursingId:nurseid});
    


    if (!hospital) {
      return res.status(404).json({ message: "Center not found for this nurse" });
    }

    const booking = await BookingModel.find({ center: hospital.center });
    console.log("booking : " , booking);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found for this center" });
    }

    res.json(booking);

  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Database connection failed" });
  }
};


const nurseupdateprofile = async (req, res) => {
    try {
        const { nursingId, phone, Image} = req.body;

        const updatedUser = await NurseModel.findOneAndUpdate(
            { nursingId },
            { $set: { phone, Image } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Updated successfully", newprofile: updatedUser });

    } catch (err) {
        console.error("Update profile error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


const nursevaccinepersonlist = async (req, res) => {
  try {
    const { id } = req.params;

    const getbooking = await BookingModel.findById(id);
    if (!getbooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const user = await UserModel.findOne({ email: getbooking.email });
    const vaccine = await VaccineModel.findOne({ Name: getbooking.vaccine });
    const book = await BookingModel.find({email:user.email})

    res.json({
      message: "Fetch successful",
      getuser: user,
      getvaccine: vaccine,
      mybook:book
    });

  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Database connection failed" });
  }
};





module.exports = { nursesignupuser , nuserloginuser , nursedeatiles , deletenurse , deletenursedeatiles , bookingData ,nurseupdateprofile , nursevaccinepersonlist}