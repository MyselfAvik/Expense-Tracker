import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (id) => {
  try {
    const user = await User.findById(id);
    const accessToken = user.accessTokenGeneration();
    const refreshToken = user.refreshTokenGeneration();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return [accessToken, refreshToken];
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { fullName, email, password, age, gender } = req.body;

  if (!fullName || !email || !password || !age || !gender) {
    return res.status(400).json({ success: false, message: "Empty Fields" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User Already Existed" });
  }
  let response;
  if (req.file?.mimetype.includes("image")) {
    const imagePath = req.file?.path;

    if (imagePath) {
      try {
        response = await uploadOnCloudinary(imagePath);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const profileImage = response?.secure_url || null;
  let user;
  user = await User.create({
    fullName,
    email,
    password,
    age,
    gender,
    ...(profileImage && { profileImage }),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res.status(400).json({ message: "Error in Registraion" });
  }

  return res
    .status(201)
    .json({ message: "User Registered", data: createdUser });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const access = req.cookies.accessToken;
  if (access) {
    return res.status(400).json({ message: "Already logged in" });
  }
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User Does not exist" });
  const passCheck = await user.isPasswordCorrect(password);
  if (!passCheck) {
    return res.status(400).json({ message: "User password not matched" });
  }
  const [accessToken, refreshToken] = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedUser = await User.findOne({ _id: user._id }).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "User Logged in",
      isLoggedIn: true,
      accessToken,
      refreshToken,
      data: loggedUser,
    });
};

export const logout = async (req, res) => {
  const user = req.user;

  user.refreshToken = "";
  await user.save({ validateBeforeSave: false });
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ isLoggedIn: false, message: "Succssfully Logged out" });
};
export const checkAuth = async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    message: "User Is Looged In",
    isLoggedIn: true,
    user,
  });
};
export const refreshAccesToken = async (req, res) => {
  const refresh = req.cookies.refreshToken;

  if (!refresh) {
    return res
      .status(400)
      .json({ message: "Refresh token Expired Or Not Found" });
  }

  const decodedUser = jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET);

  const user = await User.findById({ _id: decodedUser._id }).select(
    "-password -refreshToken"
  );

  if (!user) {
    res.status(400).json({ message: "User Not Found" });
  }
  const [accessToken, refreshToken] = await generateAccessAndRefreshToken(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "Refreshed The Acces Token",
      accessToken,
      refreshToken,
      isLoggedIn: true,
      data: user,
    });
};

export const sendExpense = async (req, res) => {
  try {
    const { title, price, category, date } = req.body;

    if (!title || !price || !category || !date) {
      return res.status(404).json({
        message: "All the fields Should be filled",
      });
    }
    const middleUser = req.user;
    const expense = {
      title,
      price,
      category,
      date,
    };

    const user = await User.findById(middleUser._id);
    user.expenses.push(expense);
    user.save({ validateBeforeSave: false });
    return res.status(200).json({
      message: "Expense Added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Cant Send Expense",
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const middleUser = req.user;
    const user = await User.findById(middleUser._id);
    const upadtedExpense = user.expenses.filter(
      (expense) => expense._id.toString() !== id
    );
    user.expenses = upadtedExpense;
    await user.save({ validateBeforeSave: false });
    return res.status(200).json({
      message: "Expense Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Cant Delete Expense",
    });
  }
};
