import { Admin } from "../../models/model.admin.js";
import { Course } from "../../models/model.courses.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, price, status } = req.body;
    const admin = await Admin.findById(req.user._id);
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    const course = await Course.findOne({ title: title });
    if (course) {
      return res
        .status(400)
        .json({ success: false, message: "Course already exists" });
    }
    const newCourse = await Course.create({
      title,
      description,
      price,
      status,
      sellerId: req.user._id,
      image: imageLink,
    });
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error " + error.message,
    });
  }
};

export const getAllCoursesByMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const courses = await Course.find({ sellerId: admin._id });
    return res.status(200).json({
      success: true,
      message: "Courses found successfully",
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error " + error.message,
    });
  }
};

export const changeStatusOfCource = async (req, res) => {
  try {
    const user = await Admin.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    if (course.sellerId != user._id) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to change this course status",
        });
    }
    course.status = !course.status;
    await course.save();
    return res
      .status(200)
      .json({ success: true, message: "Course status changed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error " + error.message,
      });
  }
};
