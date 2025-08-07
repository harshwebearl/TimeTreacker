import User from "../Model/profileModel.js";
import jwt from "jsonwebtoken";
const BASE_URL = "https://timetracker-r8o2.onrender.com/uploads";
// const BASE_URL = "http://localhost:5000/uploads"

const JWT_SECRET = process.env.JWT_SECRET;

// const sendOtp = async (req, res) => {
//   try {
//     const { mobile_number } = req.body;

//     let user = await User.findOne({ mobile_number });

//     const otp = Math.floor(100000 + Math.random() * 900000);

//     if (!user) {
//       user = await User.create({ mobile_number, otp });
//     } else {
//       user.otp = otp;
//       await user.save();
//     }

//     // console.log(`Sending OTP ${otp} to ${mobile_number}`);

//     res.status(200).json({ message: "OTP sent successfully", otp }); // Send OTP in response
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// const verifyOtp = async (req, res) => {
//   try {
//     const { mobile_number, otp } = req.body;
//     const user = await User.findOne({ mobile_number });

//     if (!user || user.otp !== Number(otp)) {
//       return res.status(400).json({ error: "Invalid OTP" });
//     }

//     const user_exists = !!(
//       user.full_name &&
//       user.email &&
//       user.state &&
//       user.city &&
//       user.work_place_name &&
//       user.position
//     );

//     if (user_exists) {
//       const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
//       return res.status(200).json({
//         message: "OTP verified",
//         user_exists: true,
//         token,
//       });
//     } else {
//       return res.status(200).json({
//         message: "OTP verified",
//         user_exists: false,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// const completeProfile = async (req, res) => {
//   try {
//     const {
//       mobile_number,
//       full_name,
//       email,
//       state,
//       city,
//       work_place_name,
//       position,
//     } = req.body;

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ error: "Invalid email format" });
//     }

//     const user = await User.findOne({ mobile_number });

//     if (!user) return res.status(404).json({ error: "User not found" });

//     user.full_name = full_name;
//     user.email = email;
//     user.state = state;
//     user.city = city;
//     user.work_place_name = work_place_name;
//     user.position = position;
//     user.status = "active";

//     await user.save();

//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

//     res.status(200).json({
//       message: "Profile completed",
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ error: "Email is required" });
//     }

//     const user = await User.findOne({ email }).select("-password -__v -otp");

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };
const login = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email }).select("-password -__v -otp");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "365d" });

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// const registerProfile = async (req, res) => {
//   try {
//     const {
//       mobile_number,
//       full_name,
//       email,
//       state,
//       city,
//       work_place_name,
//       position,
//     } = req.body;

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ error: "Invalid email format" });
//     }

//     const existingUser = await User.findOne({
//       $or: [{ mobile_number }, { email }],
//     });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ error: "Mobile number or email already exists" });
//     }

//     let photo = "";
//     if (req.file) {
//       photo = req.file.filename;
//     }

//     const user = await User.create({
//       mobile_number,
//       full_name,
//       email,
//       state,
//       city,
//       work_place_name,
//       position,
//       photo,
//       status: "active",
//     });

//     res.status(200).json({
//       message: "Profile registered successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

const registerProfile = async (req, res) => {
  try {
    const {
      mobile_number,
      full_name,
      email,
      state,
      city,
      work_place_name,
      position,
      photo
    } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({
      $or: [{ mobile_number }, { email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Mobile number or email already exists" });
    }

    const user = await User.create({
      mobile_number,
      full_name,
      email,
      state,
      city,
      work_place_name,
      position,
      photo,
      status: "active",
    });

    res.status(200).json({
      message: "Profile registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// const getUser = async (req, res) => {
//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     const istDate = new Date(
//       date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
//     );

//     const dd = String(istDate.getDate()).padStart(2, "0");
//     const mm = String(istDate.getMonth() + 1).padStart(2, "0");
//     const yy = String(istDate.getFullYear()).slice(-2);

//     let hours = istDate.getHours();
//     const minutes = String(istDate.getMinutes()).padStart(2, "0");
//     const seconds = String(istDate.getSeconds()).padStart(2, "0");
//     const ampm = hours >= 12 ? "PM" : "AM";

//     hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour clock
//     hours = String(hours).padStart(2, "0");

//     return `${dd}-${mm}-${yy} ${hours}:${minutes}:${seconds} ${ampm}`;
//   };

//   try {
//     const id = req.user._id;
//     const user = await User.findById(id).select("-password -__v -otp");

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const userObj = user.toObject();

//     if (userObj.createdAt)
//       userObj.createdAt = formatDateTime(userObj.createdAt);
//     if (userObj.updatedAt)
//       userObj.updatedAt = formatDateTime(userObj.updatedAt);

//     // Add BASE_URL to photo if photo exists
//     if (userObj.photo) {
//       userObj.photo = `${BASE_URL}/${userObj.photo}`;
//     }

//     res.status(200).json(userObj);
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };
const getUser = async (req, res) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const istDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    const dd = String(istDate.getDate()).padStart(2, "0");
    const mm = String(istDate.getMonth() + 1).padStart(2, "0");
    const yy = String(istDate.getFullYear()).slice(-2);

    let hours = istDate.getHours();
    const minutes = String(istDate.getMinutes()).padStart(2, "0");
    const seconds = String(istDate.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour clock
    hours = String(hours).padStart(2, "0");

    return `${dd}-${mm}-${yy} ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  try {
    const id = req.user._id;
    const user = await User.findById(id).select("-password -__v -otp");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userObj = user.toObject();

    if (userObj.createdAt)
      userObj.createdAt = formatDateTime(userObj.createdAt);
    if (userObj.updatedAt)
      userObj.updatedAt = formatDateTime(userObj.updatedAt);

    // Removed BASE_URL addition to photo
    // if (userObj.photo) {
    //   userObj.photo = `${BASE_URL}/${userObj.photo}`;
    // }

    res.status(200).json(userObj);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// const updateProfile = async (req, res) => {
//   try {
//     const userId = req.user._id; 
//     const updateData = { ...req.body };

//     if (req.file) {
//       updateData.photo = req.file.filename;
//     }

//     if (updateData.email) {
//       const emailExists = await User.findOne({
//         email: updateData.email,
//         _id: { $ne: userId },
//       });
//       if (emailExists) {
//         return res.status(400).json({ error: "Email already exists" });
//       }
//     }
//     if (updateData.mobile_number) {
//       const mobileExists = await User.findOne({
//         mobile_number: updateData.mobile_number,
//         _id: { $ne: userId },
//       });
//       if (mobileExists) {
//         return res.status(400).json({ error: "Mobile number already exists" });
//       }
//     }

//     const user = await User.findByIdAndUpdate(userId, updateData, {
//       new: true,
//     }).select("-password -__v -otp");

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({
//       message: "Profile updated successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateData = { ...req.body };

    // Removed photo upload handling
    // if (req.file) {
    //   updateData.photo = req.file.filename;
    // }

    if (updateData.email) {
      const emailExists = await User.findOne({
        email: updateData.email,
        _id: { $ne: userId },
      });
      if (emailExists) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    if (updateData.mobile_number) {
      const mobileExists = await User.findOne({
        mobile_number: updateData.mobile_number,
        _id: { $ne: userId },
      });
      if (mobileExists) {
        return res.status(400).json({ error: "Mobile number already exists" });
      }
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password -__v -otp");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  // sendOtp,
  // verifyOtp,
  // completeProfile,
  login,
  registerProfile,
  getUser,
  updateProfile,
};
