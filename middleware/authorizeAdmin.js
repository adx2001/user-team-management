
//validate if the user is admin
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      return next();
    }
    return res.status(403).json({ message: 'Access denied' });
  };
  
module.exports = authorizeAdmin;
  