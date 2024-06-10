import { User } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asycHandler.js";

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Invalid username and email");
  }

  const existsuser = await User.findOne({ $or: [{ username }, { email }] });
  if (existsuser) {
    throw new ApiError(401, "user already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (!user) {
    throw new ApiError(401, "create user failed");
  }

  return res.status(200).json({ user, message: "user created successfully" });
});

const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!(username || email)) {
    throw new ApiError(400, "username or email required");
  }
  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    throw new ApiError(401, "user doesnot exist");
  }

  const PasswordValid = await user.isPasswordCorrect(password);
  if (!PasswordValid) {
    throw new ApiError(401, "user does not exist");
  }

  const accessToken = await user.generateAccessTokens();

  const loggedInUser = await User.findById(user._id).select("-password");
  const Optional = {
    httpOnly: true,
    secure: false,
  };
  return res.status(200).cookie("accessToken", accessToken, Optional).json({
    accessToken,
    loggedInUser,
    message: "User logged in successfully",
  });
});

// const GoogleLoginService = asyncHandler(await (re))

export { register, login };
