import express from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
// //Check authentication
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//         res.send("You are logged in");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("You are logged in & you can delete your account");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("You are admin & you can delete all account");
// });
//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyAdmin, deleteUser);

//GET
router.get("/:id", verifyUser, getUserById);

//GET ALL
router.get("/", verifyUser, getUsers);

export default router;