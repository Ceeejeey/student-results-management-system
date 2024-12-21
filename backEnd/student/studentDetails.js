const express = require("express");
const router = express.Router();
const{ pool} = require("../config/db_config"); // Assumes you have a `db.js` file for MySQL connection
const authenticateToken = require("../middlewares/authenticateToken");
// Route to get student details and results
router.get("/students/details", authenticateToken, async (req, res) => {
    try {
      const { index_no } = req.user; // Extract reg_no from the token payload
  
      // Query to get student details
      const studentQuery = `
        SELECT  
          reg_no, 
          index_no 
        FROM students 
        WHERE index_no = ? LIMIT 1;
      `;
      const [studentResults] = await pool.query(studentQuery, [index_no]);
  
      if (studentResults.length === 0) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      const student = studentResults[0];
  
      // Query to get student results
      const resultsQuery = `
        SELECT 
          subject AS name, 
          grade, 
          semester
        FROM results 
        WHERE indexNo = ? 
        ORDER BY semester;
      `;
      const [resultsRows] = await pool.query(resultsQuery, [index_no]);
  
      // Process results into a structured format
      const results = {};
      resultsRows.forEach((row) => {
        const { semester, name, grade } = row;
        if (!results[semester]) {
          results[semester] = { subjects: [] };
        }
        results[semester].subjects.push({ name, grade });
      });
  
      // Combine student details with results
      const response = {
        reg_no: student.reg_no,
        index_no: student.index_no,
        results,
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching student details:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
