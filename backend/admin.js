import express from 'express';
import multer from 'multer';
import { adminSignup, adminLogin } from './controller/admin/admin.auth.js';
import { changeStatusOfCource, createCourse, getAllCoursesByMe } from './controller/admin/admin.createCourse.js';
import { adminAuthenticate } from './lock/adminMiddleware.js';
import { authorizedRoles } from './lock/rbac.js';

const router=express.Router();

const upload=multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:500*1024*1024
    }
})

// auth
router.post("/signup",adminSignup);
router.post("/login",adminLogin);


// course

router.post("/create_course",adminAuthenticate,authorizedRoles("super","admin"),upload.single("file"),createCourse);
router.put("/change_Status_course",adminAuthenticate,authorizedRoles("super","admin"),changeStatusOfCource);
router.get("/my_course/:courseId",adminAuthenticate,authorizedRoles("super","admin"),getAllCoursesByMe);