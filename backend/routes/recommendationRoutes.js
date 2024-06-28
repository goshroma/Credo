const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../services/recommendationService');
const { Volunteer } = require('../modelLoader');
router.get('/recommendations/:volunteerId', async (req, res) => {
    try {
      const volunteer = await Volunteer.findById(req.params.volunteerId);
      if (!volunteer) {
        return res.status(404).json({ message: 'Volunteer not found' });
      }
  
      const recommendations = await getRecommendations(volunteer.preferences);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recommendations', error: error.message });
    }
  });
  
  module.exports = router;
  