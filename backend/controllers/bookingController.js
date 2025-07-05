const {BookingOthersModel , BookingModel}= require('../model/booking')
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


const bookingvaccineothers = async (req, res) => {
  try {
    const {fullname,nic,contact,address,age,date,vaccine,dose,center ,healthConditions,allergies ,byemail} = req.body;

    const newBooking = await BookingOthersModel.create({fullname,nic,contact,address,age,date,vaccine,dose,center ,healthConditions,allergies ,byemail});

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

const vaccinelistothers = async (req, res) => { 
  try {
    const { myemail } = req.params; 

   const getbooking = await BookingOthersModel.find({ byemail: myemail });

    
    if (!getbooking) {
      return res.status(404).json({ message: "Vaccine booking  not found" });
    }

    res.status(200).json({ message: "Booking fetched successfully", getbooking });
  } catch (error) {
    console.error("Error fetching Booking:", error.message);
    res.status(500).json({ message: "Server error while fetching Booking." });
  }
};

const deletemybooking = async (req, res) => {
    try {
      const {id} = req.params;
      const result = await BookingModel.findByIdAndDelete(id);


      res.status(200).json({ message: "booking deleted successfully"});
    } catch (error) {
      res.status(500).json({ error: "Error deleting FAQ" });
    }
  };

  const bookinglist = async (req, res) => { 
  try {
    const { id } = req.params; 

    const getbooking = await BookingModel.findById(id);

    if (!getbooking) {
      return res.status(404).json({ message: "Vaccine booking not found" });
    }

    res.status(200).json(getbooking);
  } catch (error) {
    console.error("Error fetching Booking:", error.message);
    res.status(500).json({ message: "Server error while fetching Booking." });
  }
};




// Route: PUT /updatebooking
const updatemybooking = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    const updated = await BookingModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};







module.exports ={bookingvaccine , vaccinepersonlist , updatestatus , bookingvaccineothers , vaccinelistothers , deletemybooking , bookinglist , updatemybooking}