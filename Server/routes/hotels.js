import express from "express";
import { createHotel, deleteHotel, getCountByCities, getCountByTypes, getHotelById, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);
//UPDATE
router.put("/:id", updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotelById);

//GET ALL
router.get("/", getHotels);

router.get("/countbycities", getCountByCities);

router.get("/countByTypes", getCountByTypes);
router.get("/room/:id", getHotelRooms);

export default router;