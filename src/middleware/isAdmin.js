import Admin_Password from '../config/server-config.js';

export function isAdmin(req, res, next) {
  const token = req.headers['authorization'];
  if (token === Admin_Password) {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Admins only.' });
}
