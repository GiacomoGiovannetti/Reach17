const { StatusCodes } = require("http-status-codes");
const University = require("../model/university");

//Function to create a new University
exports.createUniversity = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      const newUniversity = new University({
        name: name,
      });
      const university = await newUniversity.save();
      res.status(StatusCodes.CREATED).json({
        message: "University created successfully",
        createdUniversity: {
          _id: university._id,
          name: university.name,
        },
      });
    } else {
      throw new Error("Name not provided");
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "University has not been created",
    });
  }
};

//function to modify an existing university
exports.modifyUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (name) {
      const modifiedUniversity = await University.findByIdAndUpdate(id, {
        $set: { name: name },
      });
      if (modifiedUniversity) {
        res.status(StatusCodes.OK).json({
          message: "University has been modified successfully",
          modifiedUniversity: {
            _id: modifiedUniversity._id,
            name: modifiedUniversity.name,
          },
        });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({
          message: "No valid resource for specified ID",
        });
      }
    } else {
      throw new Error("New name not provided");
    }
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "University has not been modified" });
  }
};

//function to delete an existing University
exports.deleteUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUniversity = await University.findByIdAndDelete(id);
    if (deletedUniversity) {
      res.status(StatusCodes.OK).json({
        message: "University has been deleted successfully",
        deletedUniversity: {
          _id: deletedUniversity._id,
          name: deletedUniversity.name,
        },
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No valid resource for specified ID",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "University has not been deleted",
    });
  }
};

//function to get all Universities
exports.getAllUniversities = async (req, res) => {
  try {
    const AllUniversities = await University.find().select("_id name");
    if (AllUniversities.length <= 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No resources found",
      });
    } else {
      res.status(StatusCodes.OK).json({
        count: AllUniversities.length,
        University: AllUniversities,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

//function to get one University
exports.getUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const university = await University.findById(id).select("_id name");
    if (university) {
      res.status(StatusCodes.OK).json({
        university,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No valid resource for specified ID",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};