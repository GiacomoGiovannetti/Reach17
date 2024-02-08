const { StatusCodes } = require('http-status-codes');
const Course = require('../model/course');
const validator = require('validator');

//function to create a new course
exports.createCourse = async (req, res) => {
  try {
    const { name, typeID, universityID } = req.body;
    const nameIsValid = validator.isAlphanumeric(name, ['en-US'], {
      ignore: ' ',
    });
    if (name && typeID && universityID && nameIsValid) {
      const newCourse = new Course({
        name: name,
        typeID: typeID,
        universityID: universityID,
      });
      const course = await newCourse.save();
      res.status(StatusCodes.CREATED).json({
        message: 'Course has been created successfully',
        createdCourse: {
          _id: course._id,
          name: course.name,
          typeID: course.typeID,
          universityID: course.universityID,
        },
      });
    } else if (!nameIsValid) {
      throw new Error('name can only contain alphanumeric values');
    } else {
      throw new Error('name or typeID or universityID not provided');
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Course has not been created',
    });
  }
};

//function to modify and existing course
exports.modifyCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, typeID, universityID } = req.body;
    const nameIsValid = name
      ? validator.isAlphanumeric(name, ['en-US'], {
          ignore: ' ',
        })
      : false;
    if ((name && nameIsValid) || typeID || universityID) {
      const modifiedCourse = await Course.findByIdAndUpdate(id, {
        $set: { name: name, typeID: typeID, universityID: universityID },
      });
      if (modifiedCourse) {
        res.status(StatusCodes.OK).json({
          message: 'Course has been modified successfully',
          modifiedCourse: {
            _id: modifiedCourse._id,
            name: modifiedCourse.name,
            typeID: modifiedCourse.typeID,
            universityID: modifiedCourse.universityID,
          },
        });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({
          message: 'No valid resource for specified ID',
        });
      }
    } else if (!nameIsValid) {
      throw new Error('name can only contain alphanumeric values');
    } else {
      throw new Error('name or typeID or universityID not provided');
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Course has not been modified',
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
        message: 'Course has been deleted successfully',
        deletedCourse: {
          _id: deletedCourse._id,
          name: deletedCourse.name,
          typeID: deletedCourse.typeID,
          universityID: deletedCourse.universityID,
        },
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'No valid resource for specified ID',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Course has not been deleted',
    });
  }
};

//function to get one course type
exports.getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id)
      .select('_id name typeID universityID')
      .populate('typeID', '_id name')
      .populate('universityID', '_id name');
    if (course) {
      res.status(StatusCodes.OK).json({ course });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'No valid resource for specified ID',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

//function to get all courses or filtered courses depending on query string
exports.getCourses = async (req, res) => {
  try {
    const { typeId, univId } = req.query;
    checkResponseLength = (message, courses) => {
      if (courses.length <= 0) {
        res.status(StatusCodes.NOT_FOUND).json({
          message: message,
        });
      } else {
        res.status(StatusCodes.OK).json({
          count: courses.length,
          course: courses,
        });
      }
    };
    //checks if typeId and universityId are specified in the query string, in that case gets all the course with the specified type and university
    if (typeId && univId) {
      const courses = await Course.find({
        typeID: typeId,
        universityID: { $in: univId },
      }).select('_id name');
      checkResponseLength('No valid resource for specified IDs', courses);
    }
    //checks if universityId is specified in the query string, in that case gets all the courses of the specified university
    else if (univId) {
      let courses = await Course.find({ universityID: { $in: univId } })
        .select('_id name typeID')
        .populate('typeID', 'name');
      checkResponseLength('No valid resource for specified ID', courses);
    } //checks if typeId is specified in the query string, in that case gets all courses of the specified type
    else if (typeId) {
      let courses = await Course.find({ typeID: { $in: typeId } })
        .select('_id name universityID')
        .populate('universityID', 'name');
      checkResponseLength('No valid resource for specified ID', courses);
    } //if there is no query string the api requests all the courses
    else {
      const allCourses = await Course.find()
        .select('_id name typeID universityID')
        .populate('typeID', ' _id name')
        .populate('universityID', '_id name');
      checkResponseLength('No valid resource found', allCourses);
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
