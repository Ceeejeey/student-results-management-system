const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db_config');
const bcrypt = require('bcryptjs');

//register a student
router.post('/register', async (req, res) => {
    const { faculty, regNo, indexNo, password } = req.body;
    console.log('Received data:', req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO students (faculty, reg_no, index_no, password) VALUES (?, ?, ?, ?)';

    try {
        
        const [results] = await pool.query(query, [faculty, regNo, indexNo, hashedPassword]);
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Database error:', err); 
        return res.status(500).json({ error: 'Database error occurred' });
    }
});

module.exports = router;