import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Forbidden: Invalid token' });

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Not an admin' });
    }

    req.user = decoded;
    next();
  });
};
