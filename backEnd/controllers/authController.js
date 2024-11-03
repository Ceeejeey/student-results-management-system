const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db_config');
const bcrypt = require('bcryptjs');

//register a student
router.post('/register', async (req, res) => {
    const { regNo, indexNo, email, password } = req.body;
    console.log('Received data:', req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO students (reg_no, index_no, email, password) VALUES (?, ?, ?, ?)';

    try {
        
        const [results] = await pool.query(query, [regNo, indexNo, email,  hashedPassword]);
        return res.status(201).json({ message: 'Student registered successfully' });
    } catch (err) {
        console.error('Database error:', err); 
        return res.status(500).json({ error: 'Database error occurred' });
    }
});

//register a teacher
router.post('/teacher-register', async (req, res) => {
    const { teacherId, subjectCode, email, password } = req.body;
    console.log('Received data:', req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO teachers (teacherId, subjectCode, email, password) VALUES (?, ?, ?, ?)';

    try {
        
        const [results] = await pool.query(query, [teacherId, subjectCode, email,  hashedPassword]);
        return res.status(201).json({ message: 'Taecher registered successfully' });
    } catch (err) {
        console.error('Database error:', err); 
        return res.status(500).json({ error: 'Database error occurred' });
    }
});

// Unified login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received data:', req.body);

    // Check if user is a student
    let query = 'SELECT * FROM students WHERE email = ?';
    let userType = 'student';
    
    let results = await pool.query(query, [email]);

    if (results[0].length === 0) {
        // If not a student, check if user is a teacher
        query = 'SELECT * FROM teachers WHERE email = ?';
        userType = 'teacher';
        results = await pool.query(query, [email]);

        if (results[0].length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
    }

    const user = results[0][0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    
    return res.status(200).json(userType);
});

module.exports = router;