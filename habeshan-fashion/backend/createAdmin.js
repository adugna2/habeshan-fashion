import bcrypt from 'bcrypt';
import db from './db.config.js';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

const email = process.env.ADMIN_EMAIL;
const plainPassword = process.env.ADMIN_PASSWORD;

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  const query = `INSERT INTO admins (name, email, password) VALUES (?, ?, ?)`;
  db.query(query, ['Super Admin', email, hashedPassword], (err) => {
    if (err) console.error('❌ Admin creation failed:', err);
    else console.log('✅ Admin created');
    process.exit();
  });
};

createAdmin();


