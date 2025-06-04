
export function isAdmin(req, res, next) {
  const token = req.headers['authorization'];
  if (token === process.env.Admin_Password) {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Admins only.' });
}
