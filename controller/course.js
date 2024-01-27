const { StatusCodes } = require("http-status-codes");
const Course = require("../model/course");
const validator = require("validator");

//function to create a new course
exports.createCourse = async (req, res) => {
  try {
    const { name, typeID, universityID } = req.body;
    const nameIsValid = validator.isAlphanumeric(name, ["en-US"], {
      ignore: " ",
    });
    if (name && typeID && universityID && nameIsValid) {
      const newCourse = new Course({
        name: name,
        typeID: typeID,
        universityID: universityID,
      });
      const course = await newCourse.save();
      res.status(StatusCodes.CREATED).json({
        message: "Course has been created successfully",
        createdCourse: {
          _id: course._id,
          name: course.name,
          typeID: course.typeID,
          universityID: course.universityID,
        },
      });
    } else if (!nameIsValid) {
      throw new Error("name can only contain alphanumeric values");
    } else {
      throw new Error("name or typeID or universityID not provided");
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Course has not been created",
    });
  }
};

//function to modify and existing course
exports.modifyCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, typeID, universityID } = req.body;
    const nameIsValid = name
      ? validator.isAlphanumeric(name, ["en-US"], {
          ignore: " ",
        })
      : false;
    if ((name && nameIsValid) || typeID || universityID) {
      const modifiedCourse = await Course.findByIdAndUpdate(id, {
        $set: { name: name, typeID: typeID, universityID: universityID },
      });
      if (modifiedCourse) {
        res.status(StatusCodes.OK).json({
          message: "Course has been modified successfully",
          modifiedCourse: {
            _id: modifiedCourse._id,
            name: modifiedCourse.name,
            typeID: modifiedCourse.typeID,
            universityID: modifiedCourse.universityID,
          },
        });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({
          message: "No valid resource for specified ID",
        });
      }
    } else if (!nameIsValid) {
      throw new Error("name can only contain alphanumeric values");
    } else {
      throw new Error("name or typeID or universityID not provided");
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Course has not been modified",
    });
  }
};

//function to delete an existing course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (deletedCourse) {
      res.status(StatusCodes.OK).json({
        message: "Course has been deleted successfully",
        deletedCourse: {
          _id: deletedCourse._id,
          name: deletedCourse.name,
          typeID: deletedCourse.typeID,
          universityID: deletedCourse.universityID,
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
      message: "Course has not been deleted",
    });
  }
};

//function to get all courses
exports.getAllCourse = async (req, res) => {
  try {
    const allCourses = await Course.find()
      .select("_id name typeID universityID")
      .populate("typeID", " _id name")
      .populate("universityID", "_id name");
    if (allCourses.length <= 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No valid resource found",
      });
    } else {
      res.status(StatusCodes.OK).json({
        count: allCourses.length,
        course: allCourses,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

//function to get one course type
exports.getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id)
      .select("_id name typeID universityID")
      .populate("typeID", "_id name")
      .populate("universityID", "_id name");
    if (course) {
      res.status(StatusCodes.OK).json({ course });
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

//function to get a filtered list of all the course of a specified university
exports.getCoursePerUniversity = async (req, res) => {
  try {
    const { universityId } = req.params;
    let courses = await Course.find({ universityID: { $in: universityId } })
      .select("_id name typeID")
      .populate("typeID", "name");
    if (courses.length <= 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No valid resource for specified ID",
      });
    } else {
      res.status(StatusCodes.OK).json({
        count: courses.length,
        course: courses,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

//function to get a filtered list of all the course of a specified type
exports.getCoursePerType = async (req, res) => {
  try {
    const { typeId } = req.params;
    const courses = await Course.find({ typeID: { $in: typeId } })
      .select("_id, name")
      .populate("universityID", "_id name");
    if (courses.length <= 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No valid resource for specified ID",
      });
    } else {
      res.status(StatusCodes.OK).json({
        count: courses.length,
        course: courses,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

//function to get a filtered list of all the courses of a specified type and a specified university
exports.getAllCoursePerTypeAndUniversity = async (req, res) => {
  try {
    const { typeId, universityId } = req.params;
    const courses = await Course.find({
      typeID: typeId,
      universityID: { $in: universityId },
    }).select("_id name");
    if (courses.length <= 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No valid resource for specified IDs",
      });
    } else {
      res.status(StatusCodes.OK).json({
        count: courses.length,
        course: courses,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
