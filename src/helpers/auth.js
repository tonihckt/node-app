const helpers = {};

/*
 * AUTHENTICATION _ MIDDLEWARE
*/
helpers.isAuthenticated = (req, res, next) => {
    // SI SE A LOGUEADO TRUE
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Not Authorized.');
  res.redirect('/users/signin');
};

module.exports = helpers;