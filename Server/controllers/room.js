import Room from "../models/rooms.js";
import Hotel from "../models/hotels.js"
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { 
                $push: { rooms: savedRoom._id } 
            });
            res.status(200).json(savedRoom);
        } catch (err) {
            next(err)
        } 
    } catch (err) {
        next(err);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        // to get updated data set another property $new:true
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body} ,{ $new : true});
        console.log(updateRoom);
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
}
export const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };
export const deleteRoom = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelid;
        // to get updated data set another property $ new:true
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, { 
                $pull: { rooms: deletedRoom._id } 
            });
            res.status(200).json(deletedRoom);
        } catch (err) {
            next(err)
        } 
        res.status(200).json("Room Removed from the list");
    } catch (err) {
        next(err);
    }
}
export const getRooms = async (req, res, next) => {
    try {
        // to get updated data set another property $new:true
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
}
export const getRoomById = async (req, res, next) => {
    try {
        console.log("in get rooms");
        // to get updated data set another property $new:true
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
}