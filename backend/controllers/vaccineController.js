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


module.exports = { addvaccine , vaccinelist};
