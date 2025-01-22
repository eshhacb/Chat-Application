import express from "express";
import { register,verify, login, logout, getOtherUsers } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router= express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated,getOtherUsers);
router.route('/verify').post(verify);
export default router;
