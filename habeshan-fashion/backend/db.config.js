import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'hermi',
  password: '2*Kh6U1_pk21McLv',
  database: 'habesha_corner_db',
});

db.connect((err) => {
  if (err) console.error('❌ DB connection error:', err);
  else console.log('✅ Connected to MySQL');
});

export default db;
