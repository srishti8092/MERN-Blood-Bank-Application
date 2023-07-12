const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTER
const registerController = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    //validation
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "user already exists",
      });
    }
    //hashed password
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(req.body.password, salt);
    req.body.password = hashpassword;

    //rest data
    const user = new UserModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

//LOGIN
const loginController = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    // check role
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "role dosenot match",
      });
    }

    //comapare password
    const comaparepassword = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!comaparepassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const JWT_SECRET = process.env.JWT_SECRET || "Srishti@0018";
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

//GET CURRENT USER
const currentUserController = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId});
    return res.status(200).send({
        success: true,
        message: "user fetched successfully",
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to get current user details",
      error,
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
