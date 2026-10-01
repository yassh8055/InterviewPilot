const userModel = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklist");

/**
 * @name registerUserController
 * @description Register a new user, expects username email and password in req.body
 * @access Public
 */
const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password",
    });
  }

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "Account Exits with this username or email",
    });
  }

  const hashedPassword = await bcryptjs.hash(password, 12);

  const user = await userModel.create({
    username,
    password: hashedPassword,
    email,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registerd successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

/**
 * @name loginUserController
 * @description login a user, expects email and password in req.body
 * @access Public
 */
const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid Email or Password",
    });
  }
  const isPasswordValid = await bcryptjs.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Email or Password",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000
});

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

/**
 * @name logoutUserController
 * @description logout a user, blacklist token from cookie
 * @access Public
 */
const logoutUserController = async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    await blacklistTokenModel.create({ token });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
});

  res.status(200).json({
    message: "user logout successfully",
  });
};

/**
 * @name getMeController
 * @description get current logged in user details.
 * @access Public
 */
const getMeController = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    message: "User detail fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

exports.registerUserController = registerUserController;
exports.loginUserController = loginUserController;
exports.logoutUserController = logoutUserController;
exports.getMeController = getMeController;
