import express from 'express';
import { userLogin, userSignup } from './controller/user/user.auth.js';

const router=express.Router();

// auth
router.post("/signup",userSignup);
router.post("/login",userLogin);