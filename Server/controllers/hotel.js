import Hotel from "../models/hotels.js";
import Room from "../models/rooms.js"
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
}
export const updateHotel = async (req, res, next) => {
    try {
        // to get updated data set another property $new:true
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}
export const deleteHotel = async (req, res, next) => {
    try {
        // to get updated data set another property $new:true
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel Removed from the list");
    } catch (err) {
        next(err);
    }
}
export const getHotels = async (req, res, next) => {
    const {min,max,...others} = req.query;
    try {
        // to get updated data set another property $new:true
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 9999 },
          }).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}
export const getHotelById = async (req, res, next) => {
    try {
        // to get updated data set another property $new:true
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}
export const getCountByCities = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city });
        }));
        // to get updated data set another property $new:true
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}
export const getCountByTypes = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({type:"hotel"});
        const apartmentCount = await Hotel.countDocuments({type:"apartment"});
        const resortCount = await Hotel.countDocuments({type:"resort"});
        const villaCount = await Hotel.countDocuments({type:"villa"});
        const cabinCount = await Hotel.countDocuments({type:"cabin"});
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
    ]);
    } catch (err) {
        next(err);
    }
}
export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };
  