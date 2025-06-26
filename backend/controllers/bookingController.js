const BookingModel = require('../model/booking')

const bookingvaccine = async (req, res) => {
  try {
    const {fullname,email,contact,address,age,date,vaccine,dose,healthConditions,allergies ,center,} = req.body;

    const newBooking = await BookingModel.create({fullname,email,contact,address,age,date,vaccine,dose,healthConditions,allergies ,center});

    res.status(201).json({
      message: "Vaccine inserted successfully",
      booking: newBooking
    });

  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({
      message: "Failed to insert vaccine booking",
      error: error.message
    });
  }
};

const vaccinepersonlist = async (req, res) => { 
  try {
    const { myemail } = req.params; // ✅ use req.params

   const getbooking = await BookingModel.find({ email: myemail });
   console.log("getbooking:", getbooking); // Returns an array

    
    if (!getbooking) {
      return res.status(404).json({ message: "Vaccine booking  not found" });
    }

    res.status(200).json({ message: "Booking fetched successfully", getbooking });
  } catch (error) {
    console.error("Error fetching Booking:", error.message);
    res.status(500).json({ message: "Server error while fetching Booking." });
  }
};





module.exports ={bookingvaccine , vaccinepersonlist}