const CourseType = require("../model/courseType");
const { StatusCodes } = require("http-status-codes");

//Function to create a new course type
exports.createCourseType = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      const newCourseType = new CourseType({
        name: name,
      });
      const courseType = await newCourseType.save();
      res.status(StatusCodes.CREATED).json({
        message: "Course type created successfully",
        createdCourseType: { _id: courseType._id, name: courseType.name },
      });
    } else {
      throw new Error("name not provided");
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Course type has not been created",
    });
  }
};

//function to modify an existing course type
exports.modifyCourseType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (name) {
      const modifiedCourseType = await CourseType.findByIdAndUpdate(id, {
        $set: { name: req.body.name },
      });
      if (modifiedCourseType) {
        res.status(StatusCodes.OK).json({
          message: "Course type has been modified",
          modifiedCourseType: {
            _id: modifiedCourseType._id,
            name: modifiedCourseType.name,
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Course type has not been modified",
    });
  }
};

//function to delete an existing course type
exports.deleteCourseType = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourseType = await CourseType.findByIdAndDelete(id);
    if (deletedCourseType) {
      res.status(StatusCodes.OK).json({
        message: "Course type has been deleted successfully",
        deletedCourseType: {
          _id: deletedCourseType._id,
          name: deletedCourseType.name,
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
      message: "Course type has not been deleted",
    });
  }
};

// function to get all the course types
exports.getAllCourseType = async (req, res) => {
  try {
    const allCourseType = await CourseType.find().select("_id name");
    if (allCourseType.length <= 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No resources found",
      });
    } else {
      res.status(StatusCodes.OK).json({
        count: allCourseType.length,
        courseType: allCourseType,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

//function to get a single course type
exports.getCourseType = async (req, res) => {
  try {
    const { id } = req.params;
    const courseType = await CourseType.findById(id).select("_id name");
    if (courseType) {
      res.status(StatusCodes.OK).json(courseType);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No valid resource for specified ID" });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
