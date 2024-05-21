const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "No such user exists",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User Found",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "No such user exists",
        success: false,
      });
    }

    if (req.body.name) {
      return res.status(200).json({
        message: "Name updated successfully",
        success: true,
        updatedUser,
      });
    }
    if (req.body.password) {
      return res.status(200).json({
        message: "Password updated successfully",
        success: true,
        updatedUser,
      });
    }
    if (req.body.email) {
      return res.status(200).json({
        message: "Email updated successfully",
        success: true,
        updatedUser,
      });
    }

    return res.status(200).json({
      message: "Record updated successfully",
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const Deleteduser = await User.findByIdAndDelete(id);
    if (!DeleteUser) {
      return res.status(404).json({
        message: "No such user exists",
        success: false,
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//follow

const followUser = async (req, res) => {
  const followedUserId = req.params.id;
  const loggedUserId = req.body.id;
  if (loggedUserId === followedUserId) {
    return res.status(403).json({
      message: "Action Forbidden!!!",
      success: false,
    });
  } else {
    try {
      const followedUser = await User.findById(followedUserId);
      const loggedUser = await User.findById(loggedUserId);
      if (!followedUser.followers.includes(loggedUserId)) {
        await followedUser.updateOne({ $push: { followers: loggedUserId } });
        await loggedUser.updateOne({ $push: { following: followedUserId } });
        return res.status(200).json({
          message: `You just follow the ${followedUser.name}`,
          success: true,
        });
      } else {
        await followedUser.updateOne({ $pull: { followers: loggedUserId } });
        await loggedUser.updateOne({ $pull: { following: followedUserId } });
        return res.status(200).json({
          message: `You just unfollow the ${followedUser.name}`,
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Follow User problem internal server",
        success: false,
      });
    }
  }
};
const otherUsers = async (req, res) => {
  try {
    const LoggedId = req.params.id;
    const OtherUsers = await User.find({ _id: { $ne: LoggedId } }).select(
      "-password"
    );
    if (OtherUsers.length === 0) {
      return res.status(200).json({
        message: "No other users found!",
        success: true,
        OtherUsers: [],
      });
    }
    return res.status(200).json({
      message: "Other users found!",
      success: true,
      OtherUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Couldn't get other users!",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getUser,
  updateUser,
  otherUsers,
  DeleteUser,
  followUser,
};
