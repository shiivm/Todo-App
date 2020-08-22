const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate(
    "jwt",
    { session: false, failWithError: true },
    function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) return res.status(401).json({errorMsg : "Unauthorized Access!!"});
      req.userInfo = user;
      next();
    }
  )(req, res, next);
};
