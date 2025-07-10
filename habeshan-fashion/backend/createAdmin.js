import bcrypt from 'bcrypt';
import db from './db.config.js';

const email = 'admin@hermi.com';
const plainPassword = 'admin444';

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
