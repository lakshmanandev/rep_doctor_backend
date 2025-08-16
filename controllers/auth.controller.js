const authService = require('../services/auth.service');
const { success, error } = require("../utils/response.util");

exports.repRegister = async (req, res) => {
  try {
    const result = await authService.registerRep(req.body);
    return success(res, result, 201);
  } catch (err) { return error(res, err.message, 400); }
};

exports.repLogin = async (req, res) => {
  try {
    const result = await authService.loginRep(req.body);
    return success(res, result);
  } catch (err) { return error(res, err.message, 400); }
};



exports.doctorRegister = async (req, res) => {
  try {
    const result = await authService.registerDoctor(req.body);
    return success(res, result, 201);
  } catch (err) { return error(res, err.message, 400); }
};

exports.doctorLogin = async (req, res) => {
  try {
    const result = await authService.loginDoctor(req.body);
    return success(res, result);
  } catch (err) { return error(res, err.message, 400); }
};
