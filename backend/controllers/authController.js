const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// generate JWT token

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ── REGISTER ──────
const register = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
      // Validation
      if (!name || !email || !password)
        return res.status(400).json({ success: false, message: 'All fields required.' });
  
      if (password.length < 6)
        return res.status(400).json({ success: false, message: 'Password min 6 characters.' });
  
      // Check if email already exists
      const exists = await pool.query('SELECT id FROM users WHERE email=$1', [email]);
      if (exists.rows.length > 0)
        return res.status(409).json({ success: false, message: 'Email already registered.' });
  
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const result = await pool.query(
        'INSERT INTO users (name,email,password,phone) VALUES ($1,$2,$3,$4) RETURNING id,name,email,role',
        [name, email, hashedPassword, phone]
      );
  
      const user = result.rows[0];
      const token = generateToken(user.id);//generate JWT token.Without id, you cannot create a token

        res.status(201).json({ success: true, message: 'Account created!', 
        data: { user, token } 
        });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error.' });
    }
  };


// ── LOGIN ─────────────────────────────────────────────────
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password)
        return res.status(400).json({ success: false, message: 'Email and password required.' });
  
      // Find user by email
      const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
      if (result.rows.length === 0)
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  
      const user = result.rows[0];
  
      // Compare entered password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch){
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }
  
      const token = generateToken(user.id);
      const { password: _, ...safeUser } = user; // remove password from response
  
      res.json({ success: true, message: 'Login successful!', data: { user: safeUser, token } });
  
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error.' });
    }
  };

  // ── GET LOGGED IN USER ─────────
const getMe = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id,name,email,phone,role,created_at FROM users WHERE id=$1',
      [req.user.id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { register, login, getMe };

