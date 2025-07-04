const NewsModel = require("../model/news");
const newModel = require("../model/news")

const addnewscenter =async (req, res) => {
  try {
    const {title , news} = req.body;

    const newnews = await newModel.create({title , news});

    res.status(201).json({
      message: "news inserted successfully",
    });

  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({
      message: "Failed to insert news",
      error: error.message
    });
  }
};



const allnews = async (req, res) => {
    try {
        const allnews = await NewsModel.find();
        res.json({allnews:allnews});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Database connection failed" });
    }
};


const updateNews = async (req, res) => {
  try {
    const { id } = req.params; // news ID from URL
    const { title, news } = req.body; // updated data from body

    const updatedNews = await NewsModel.findByIdAndUpdate(
      id,
      { title, news, updatedAt: new Date() },
      { new: true } // returns the updated document
    );

    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json({ message: "News updated", data: updatedNews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating news" });
  }
};


const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNews = await NewsModel.findByIdAndDelete(id);
    if (!deletedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting news" });
  }
};



module.exports ={addnewscenter ,allnews , updateNews , deleteNews}