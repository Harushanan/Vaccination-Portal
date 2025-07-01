const BookingModel = require('../model/booking')
const {VaccineModel} = require("../model/vaccine")

const bookingvaccine = async (req, res) => {
  try {
    const {fullname,email,contact,address,age,date,vaccine,dose,healthConditions,allergies ,center} = req.body;

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
    const { myemail } = req.params; 

   const getbooking = await BookingModel.find({ email: myemail });

    
    if (!getbooking) {
      return res.status(404).json({ message: "Vaccine booking  not found" });
    }

    res.status(200).json({ message: "Booking fetched successfully", getbooking });
  } catch (error) {
    console.error("Error fetching Booking:", error.message);
    res.status(500).json({ message: "Server error while fetching Booking." });
  }
};

const updatestatus = async (req, res) => {
  const { id } = req.params;
  const { status, reason, nursename, nurseId } = req.body;

  try {
    const getbook = await BookingModel.findById(id); 

    if (!getbook) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const getvaccine = await VaccineModel.findOne({ Name: getbook.vaccine }); // ✅ fix: correct query

    if (!getvaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    // ✅ Update booking status
    const updatedStatus = await BookingModel.findByIdAndUpdate(
      id,
      {
        status,
        removereason:reason,
        injectBy: nursename,
        injectById: nurseId
      },
      { new: true }
    );

    if (status === "approve" && getvaccine.Slots > 0) {
      const finalslot = getvaccine.Slots - 1;

      await VaccineModel.findByIdAndUpdate(
        getvaccine._id,
        { Slots: finalslot },
        { new: true }
      );
    }

    res.json({ message: "Status updated successfully" });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};






module.exports ={bookingvaccine , vaccinepersonlist , updatestatus}