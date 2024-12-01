import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";

const router: Router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//secured routes
// router.route("/logout").post(verifyJWT,  logoutUser)
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/change-password").post(verifyJWT, changeCurrentPassword)
// router.route("/current-user").get(verifyJWT, getCurrentUser)
// router.route("/update-account").patch(verifyJWT, updateAccountDetails)

export default router;
