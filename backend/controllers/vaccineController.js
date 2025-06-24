const { VaccineModel } = require('../model/vaccine');

//-----------------Add New Vaccine -----------------//

const addvaccine = async (req, res) => {
  try {
    const { Name, Type, Slots, Age, Doses, Manufacturer, Instructions } = req.body;

    const newVaccine = await VaccineModel.create({
      Name,
      Type,
      Slots,
      Age,
      Doses,
      Manufacturer,
      Instructions
    });

    res.status(201).json({ message: "Vaccine added successfully"});

  } catch (error) {
    console.error("Error adding vaccine:", error.message);
    res.status(500).json({ message: "Server error while adding vaccine." });
  }
};


const vaccinelist = async (req, res) => {
    try {
        const allvaccine = await VaccineModel.find(); 
        res.json(allvaccine); // ✅ Send the actual vaccine data
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Database connection failed" });
    }
};

const updatecount = async (req, res) => {
  try {
    const { newcount, id } = req.body;

    const vaccine = await VaccineModel.findByIdAndUpdate(id,{ Slots: newcount },{ new: true });
    
    res.status(200).json({ message: "Count updated successfully", vaccine });
  } catch (error) {
    console.error("Error updating vaccine:", error.message);
    res.status(500).json({ message: "Server error while updating vaccine." });
  }
};

const vaccineid = async (req, res) => { 
  try {
    const { id } = req.params; // ✅ use req.params

    const getvaccine = await VaccineModel.findById(id); // ✅ no need to wrap id in an object
    
    if (!getvaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    res.status(200).json({ message: "Vaccine fetched successfully", getvaccine });
  } catch (error) {
    console.error("Error fetching vaccine:", error.message);
    res.status(500).json({ message: "Server error while fetching vaccine." });
  }
};




module.exports = { addvaccine , vaccinelist , updatecount , vaccineid};
