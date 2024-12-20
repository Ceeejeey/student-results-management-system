const express = require('express');
const router = express.Router();
const { pool } = require('../config/db_config'); 



// Get all students
router.get('/students', async (req, res) => {
    try {
      const [students] = await pool.query('SELECT id, reg_no, index_no, batch  FROM students');
      res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students:', error.message);
      res.status(500).json({ message: 'Failed to fetch student data' });
    }
  });
  
  module.exports = router;