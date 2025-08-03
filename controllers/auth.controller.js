const authService = require('../services/auth.service');

exports.repRegister = async (req, res) => {
    try {
      const result = await authService.handleRepRegister(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  exports.repLogin = async (req, res) => {
    try {
      const result = await authService.handleRepLogin(req.body);
      res.json(result);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  };
  


exports.doctorRegister = async (req, res) => {
    try {
        const result = await authService.handleDoctorRegister(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.doctorLogin = async (req, res) => {
    try {
        const result = await authService.handleDoctorLogin(req.body);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};
