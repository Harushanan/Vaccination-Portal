const {CenterModel} = require('../model/center')


const addcenter =  async (req, res) => {
    try {
        const { email} = req.body;
    
        const center = await CenterModel.findOne({ email }); //02

        if (!center) {
            const newCenter = await CenterModel.create({ ...req.body}); 
            res.json({ message: "centerCreated" });
        } else {
            res.json({ message: "centerAlreadyExists" });
        }
    } catch (err) {
        console.error("centerCreated:", err);
        res.status(400).json({ error: "Error creating center . Please try again." });
    }
};


const displaycenter = async (req, res) => {
    try {
        const center = await CenterModel.find();
        res.json(center);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Database connection failed" });
    }
};

const displayonecenter = async (req, res) => { 
  try {
    const { id } = req.params; 

   const getCenter= await CenterModel.findById(id);
   console.log("getbooking:", getCenter); // Returns an array

    
    if (!getCenter) {
      return res.status(404).json({ message: "center  not found" });
    }

    res.status(200).json({ message: "Center fetched successfully", getCenter });
  } catch (error) {
    console.error("Error fetching Center:", error.message);
    res.status(500).json({ message: "Server error while fetching Center." });
  }
};


const updatecenter = async (req, res) => {
  const { id } = req.params;
  const { center, address, venue, email, phone, startTime, closeTime, nurse , nursingId} = req.body;

  try {
    const updatedCenter = await CenterModel.findByIdAndUpdate(id, {
        center,
        address,
        venue,
        email,
        phone,
        startTime,
        closeTime,
        nurse,
        nursingId
      },
      { new: true } // returns the updated document
    );

    if (updatedCenter) {
      res.json({ message: "Center updated successfully" });
    } else {
      res.status(404).json({ message: "Center not found" });
    }
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const removecenter = async (req, res) => {

    try {
      const { Id } = req.params;
      const result = await CenterModel.findByIdAndDelete(Id);


      res.status(200).json({ message: "Center deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting Center" });
    }
  };

module.exports = { addcenter , displaycenter , displayonecenter , updatecenter , removecenter}