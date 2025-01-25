import express from "express";
import { register,verify, login, logout, getOtherUsers, resendOTP } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router= express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated,getOtherUsers);
router.route('/verify').post(verify);
router.route('/resendOTP').post(resendOTP);
export default router;
