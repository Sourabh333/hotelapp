import express from "express";
import { createRoom, deleteRoom, getRoomById, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);
//UPDATE
router.put("/:id", verifyAdmin, updateRoom);

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET
router.get("/:id", verifyAdmin, getRoomById);
//UPDATE
router.put("/availability/:id", updateRoomAvailability);
//GET ALL
router.get("/", verifyAdmin, getRooms);

export default router;