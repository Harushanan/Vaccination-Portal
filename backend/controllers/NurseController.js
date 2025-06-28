const {NurseModel , NurseDeleteModel} = require('../model/nurse')
const {CenterModel} = require('../model/center')
const BookingModel = require('../model/booking')
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
        const { email, password , nurseid } = req.body;
        console.log("Nurse Deatiles : " ,req.body )
        const userExists = await NurseModel.findOne({ email }); //02

        if (!userExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await NurseModel.create({ ...req.body, password: hashedPassword ,nursingId:nurseid}); 
            res.json({ message: "UserCreated" });
        } else {
            res.json({ message: "EmailAlreadyExists" });
        }
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



module.exports = { nursesignupuser , nuserloginuser , nursedeatiles , deletenurse , deletenursedeatiles , bookingData}