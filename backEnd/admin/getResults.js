const express = require('express');
const router = express.Router();
const { pool } = require('../config/db_config'); // Assuming pool is correctly configured

// Save results
router.post('/results', async (req, res) => {
  const data = req.body.data;

  try {
    // Fetch students to validate regNo and indexNo
    const [students] = await pool.query('SELECT id, reg_no, index_no, batch FROM students');

    const values = data.map(row => [
      row.regNo,
      row.indexNo,
      row.subject,
      row.grade,
      row.year,
      row.semester,
    ]);

    // Insert results into the database
    const sql = 'INSERT INTO results (regNo, indexNo, subject, grade, year, semester) VALUES ?';
    await pool.query(sql, [values]);

    res.send('Data saved successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to save data.');
  }
});

// Fetch results
router.get('/results', async (req, res) => {
  const { year, semester } = req.query;

  try {
    const sql = 'SELECT * FROM results WHERE year = ? AND semester = ?';
    const [results] = await pool.query(sql, [year, semester]);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch data.');
  }
});

// DELETE route to delete results based on year and semester
router.delete('/results', async (req, res) => {
    const { year, semester } = req.query;
  
    if (!year || !semester) {
      return res.status(400).send('Year and semester are required.');
    }
  
    try {
      const sql = 'DELETE FROM results WHERE year = ? AND semester = ?';
      const [result] = await pool.query(sql, [year, semester]);
  
      if (result.affectedRows > 0) {
        res.status(200).send('Results deleted successfully.');
      } else {
        res.status(404).send('No results found for the specified year and semester.');
      }
    } catch (err) {
      console.error('Error deleting results:', err);
      res.status(500).send('Failed to delete results. Please try again.');
    }
  });
  
module.exports = router;
