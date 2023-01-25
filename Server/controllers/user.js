import User from "../models/users.js";

export const updateUser = async (req, res, next) => {
    try {
        // to get updated data set another property $new:true
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        // to get updated data set another property $new:true
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Removed from the list");
    } catch (err) {
        next(err);
    }
}
export const getUsers = async (req, res, next) => {
    try {
        // to get updated data set another property $new:true
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}
export const getUserById = async (req, res, next) => {
    try {
        // to get updated data set another property $new:true
        const User = await User.findById(req.params.id);
        res.status(200).json(User);
    } catch (err) {
        next(err);
    }
}
