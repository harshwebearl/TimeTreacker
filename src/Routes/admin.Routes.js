// src/Routes/admin.Routes.js

import express from 'express';
import {
  appAdminSignIn,
  getappAdminProfile,
  updateappAdminProfile,
  appAdminchangePassword,
  getAllUsers,
  getUserById,
  getAttendanceByUserId,
  getFilteredAttendance
} from '../Controller/admin.Controller.js';

import { AppAdminprotect } from '../Middleware/authMiddleware.js';

const router = express.Router();

// POST /api/admin/login
router.post('/login', appAdminSignIn);

// GET /api/admin/getadminprofile
router.get('/getadminprofile', AppAdminprotect, getappAdminProfile);

// PUT /api/admin/updateprofile
router.put('/updateprofile', AppAdminprotect, updateappAdminProfile);

// PUT /api/admin/changepassword
router.put('/changepassword', AppAdminprotect, appAdminchangePassword);

// GET /api/admin/getallusers
router.get('/getallusers', AppAdminprotect, getAllUsers);

// GET /api/admin/getuser/:id
router.get('/getuser/:id', AppAdminprotect, getUserById);

// POST /api/admin/filter
router.post('/filter', AppAdminprotect, getFilteredAttendance);

// GET /api/admin/byuserid/:id
router.get('/byuserid/:id', AppAdminprotect, getAttendanceByUserId);

export default router;
