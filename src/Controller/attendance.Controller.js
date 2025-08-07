import Attendance from "../Model/attendanceModel.js";
import mongoose from "mongoose";

const createAttendance = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { date, in_time } = req.body;

    if (date){
      const existingAttendance = await Attendance.findOne({
        user: userId,
        date,
      });
      if (existingAttendance) {
        return res.status(400).json({ message: "Attendance already exists for this date" });
      }
    }

    const attendance = await Attendance.create({
      user: userId,
      date,
      in_time,
    });
    res.status(201).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while creating attendance" });
  }
}

const getAllAttendance = async (req, res) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    const dd = String(istDate.getDate()).padStart(2, '0');
    const mm = String(istDate.getMonth() + 1).padStart(2, '0');
    const yy = String(istDate.getFullYear()).slice(-2);

    let hours = istDate.getHours();
    const minutes = String(istDate.getMinutes()).padStart(2, '0');
    const seconds = String(istDate.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, '0');

    return `${dd}-${mm}-${yy} ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    const dd = String(istDate.getDate()).padStart(2, '0');
    const mm = String(istDate.getMonth() + 1).padStart(2, '0');
    const yy = String(istDate.getFullYear()).slice(-2);

    return `${dd}-${mm}-${yy}`;
  };

  try {
    const userId = req.user._id;

    const attendance = await Attendance.find({ user: userId }).select("-user").lean();
    const userData = await Attendance.findOne({ user: userId })
      .populate("user", "-password -__v -otp")
      .select("user")
      .lean();

    const user = userData?.user;

    if (user) {
      if (user.createdAt) user.createdAt = formatDateTime(user.createdAt);
      if (user.updatedAt) user.updatedAt = formatDateTime(user.updatedAt);
    }

    const formattedAttendance = attendance.map((entry) => ({
      ...entry,
      date: formatDate(entry.date),
      createdAt: formatDateTime(entry.createdAt),
      updatedAt: formatDateTime(entry.updatedAt),
    }));

    res.status(200).json({
      user: user || null,
      attendance: formattedAttendance,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching attendance" });
  }
};

const getAttendanceById = async (req, res) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    const dd = String(istDate.getDate()).padStart(2, '0');
    const mm = String(istDate.getMonth() + 1).padStart(2, '0');
    const yy = String(istDate.getFullYear()).slice(-2);

    let hours = istDate.getHours();
    const minutes = String(istDate.getMinutes()).padStart(2, '0');
    const seconds = String(istDate.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, '0');

    return `${dd}-${mm}-${yy} ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    const dd = String(istDate.getDate()).padStart(2, '0');
    const mm = String(istDate.getMonth() + 1).padStart(2, '0');
    const yy = String(istDate.getFullYear()).slice(-2);

    return `${dd}-${mm}-${yy}`;
  };

  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid attendance ID" });
    }

    const attendance = await Attendance.findOne({
      _id: id,
      user: userId,
    }).populate("user", "-password -__v -otp").lean();

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    if (attendance.createdAt) attendance.createdAt = formatDateTime(attendance.createdAt);
    if (attendance.updatedAt) attendance.updatedAt = formatDateTime(attendance.updatedAt);
    if (attendance.date) attendance.date = formatDate(attendance.date);

    if (attendance.user) {
      if (attendance.user.createdAt) attendance.user.createdAt = formatDateTime(attendance.user.createdAt);
      if (attendance.user.updatedAt) attendance.user.updatedAt = formatDateTime(attendance.user.updatedAt);
    }

    res.status(200).json(attendance);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching attendance" });
  }
};

const getByDate = async (req, res) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    const dd = String(istDate.getDate()).padStart(2, '0');
    const mm = String(istDate.getMonth() + 1).padStart(2, '0');
    const yy = String(istDate.getFullYear()).slice(-2);

    let hours = istDate.getHours();
    const minutes = String(istDate.getMinutes()).padStart(2, '0');
    const seconds = String(istDate.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, '0');

    return `${dd}-${mm}-${yy} ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    const dd = String(istDate.getDate()).padStart(2, '0');
    const mm = String(istDate.getMonth() + 1).padStart(2, '0');
    const yy = String(istDate.getFullYear()).slice(-2);

    return `${dd}-${mm}-${yy}`;
  };

  try {
    const userId = req.user._id;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const attendance = await Attendance.findOne({ user: userId, date }).populate("user", "-password -__v -otp").lean();

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found for this date" });
    }

    if (attendance.createdAt) attendance.createdAt = formatDateTime(attendance.createdAt);
    if (attendance.updatedAt) attendance.updatedAt = formatDateTime(attendance.updatedAt);
    if (attendance.date) attendance.date = formatDate(attendance.date);

    if (attendance.user) {
      if (attendance.user.createdAt) attendance.user.createdAt = formatDateTime(attendance.user.createdAt);
      if (attendance.user.updatedAt) attendance.user.updatedAt = formatDateTime(attendance.user.updatedAt);
    }

    res.status(200).json(attendance);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching attendance" });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { out_time, break_time } = req.body;
    const attendance = await Attendance.findOneAndUpdate(
      { _id: id, user: userId },
      { out_time, break_time },
      { new: true }
    );
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating attendance" });
  }
}

const rangeOfDate = async (req, res) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    const dd = String(istDate.getDate()).padStart(2, '0');
    const mm = String(istDate.getMonth() + 1).padStart(2, '0');
    const yy = String(istDate.getFullYear()).slice(-2);

    let hours = istDate.getHours();
    const minutes = String(istDate.getMinutes()).padStart(2, '0');
    const seconds = String(istDate.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, '0');

    return `${dd}-${mm}-${yy} ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    const dd = String(istDate.getDate()).padStart(2, '0');
    const mm = String(istDate.getMonth() + 1).padStart(2, '0');
    const yy = String(istDate.getFullYear()).slice(-2);

    return `${dd}-${mm}-${yy}`;
  };

  try {
    const userId = req.user._id;
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return res.status(400).json({ message: "End date cannot be before start date" });
    }

    const attendance = await Attendance.find({
      user: userId,
      date: {
        $gte: start,
        $lte: end
      }
    }).select("-user").lean();

    const user = await Attendance.findOne({ user: userId })
      .populate("user", "-password -__v -otp")
      .select("user")
      .lean();

    const formattedAttendance = attendance.map((entry) => ({
      ...entry,
      createdAt: entry.createdAt ? formatDateTime(entry.createdAt) : null,
      updatedAt: entry.updatedAt ? formatDateTime(entry.updatedAt) : null,
      date: entry.date ? formatDate(entry.date) : null
    }));

    const formattedUser = user && user.user ? {
      ...user.user,
      createdAt: user.user.createdAt ? formatDateTime(user.user.createdAt) : null,
      updatedAt: user.user.updatedAt ? formatDateTime(user.user.updatedAt) : null
    } : null;

    res.status(200).json({
      user: formattedUser,
      attendance: formattedAttendance
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching attendance for date range" });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const attendance = await Attendance.findOneAndDelete({
      _id: id,
      user: userId,
    });
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting attendance" });
  }
};

export {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  rangeOfDate,
  deleteAttendance,
  getByDate
};