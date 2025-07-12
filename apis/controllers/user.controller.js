const { generateAccessToken } = require("../../utils/common");
const { USER_EXIST } = require("../../utils/constant/User.consts");
const UserModel = require("../models/User");

async function Register(req, res) {
  try {
    const { email, phoneNo } = req.body;
    const isUserExists = await isUserExist(email.toLowerCase(), phoneNo);
    if (isUserExists) {
      return res.status(400).json(func.responseGenerator(400, func.USER_CONSTANT.USER_EXIST, [], true) );
    }
    let role;
    if (req.body.role === "ADMIN") {
      role = req.body.role ? "ADMIN" : "ADMIN";
    } else if (req.body.role === "USER") {
      role = req.body.role ? "USER" : "USER";
    } else {
      role = "SUPER_ADMIN";
    }

    const user = await UserModel.create({
      ...req.body,
      role: role,
      email: email.toLowerCase(),
    });
    res.status(201).json(func.responseGenerator(201, "User registered successfully", user));
  } catch (error) {
    console.error("Error in Register controller", error);
    res.status(500).json(func.responseGenerator(500, "Registration failed", error.message, true));
  }
}

async function Login(req, res) {
  try {
    const { email, phoneNo, password } = req.body;
    const user = await UserModel.findOne({
      $or: [{ phoneNo: phoneNo }, { email: email }],
      isDeleted: false,
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this username",
      });
    }

    const isPasswordMatch = await user.isPasswordMatch(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        accessToken,
        user: user.toJSON(),
      },
    });
  } catch (error) {
    console.error("Error in login controller", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getRoleWise(req, res) {
  try {
    const userExists = await UserModel.findOne({
      _id: req.sessionObject.id,
      isDeleted: false,
    });

    if (!userExists) {
      return res.status(400).json(func.responseGenerator(400, func.USER_CONSTANT.USER_EXIST, [], true) );
    }
    res.status(200).json(func.responseGenerator(200, "data retrieved successfully", userExists));
  } catch (error) {
    console.error("Error in get Role Wise", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function isUserExist(email, phoneNo) {
  const user = await UserModel.findOne({
    $or: [{ email: email }, { phoneNo: phoneNo }],
    isDeleted: false,
  });
  return user;
}

module.exports = {
  Register,
  Login,
  getRoleWise
};
