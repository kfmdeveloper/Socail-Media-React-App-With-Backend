const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//Register Account
const secretKey =
  "thisiskhalidfarooqandmyfatehernmaeisksdlkfjsl234234234kl@35^%$#";

const Register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
      return res.status(401).json({
        message: "Please enter details!",
        success: false,
      });
    }
    const fuserbyemail = await User.findOne({ email });
    const fuserbyusername = await User.findOne({ username });
    if (fuserbyemail) {
      return res.status(401).json({
        message: "User Already exists!",
        success: false,
      });
    }
    if (fuserbyusername) {
      return res.status(401).json({
        message: "User Already exists!",
        success: false,
      });
    }
    const token = jwt.sign({ email }, secretKey);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      expiresIn: "1d",
    });
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      username,
    });

    user.save();
    return res.status(200).json({
      message: "User Created successfully",
      user,
      success: true,
    });
    console.log(user);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

//Login Account
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Please enter the details",
        success: false,
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password!",
        success: false,
      });
    }
    const token = jwt.sign({ email }, secretKey);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Invalid email or password!",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Login successfully",
      user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

//HomePage

//logout

const Logout = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        message: "User Not Found!",
        success: false,
      });
    }

    res
      .cookie("token", "", {
        expiresIn: new Date(Date.now()),
      })
      .json({
        message: "logout successfully",
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
module.exports = {
  Register,
  Login,
  Logout,
};
