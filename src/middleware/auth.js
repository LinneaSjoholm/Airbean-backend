
// Middleware för att autentisera en användare

const authenticate = (req, res, next) => {
  
  // Om det finns en global användare, sätt req.user till den globala användaren
  if (global.currentUser) {
    req.user = global.currentUser;
  }
  next();
};

export default authenticate;
