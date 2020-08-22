const jwt = require("jsonwebtoken");

exports.issueJWT = (user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    process.env.SECRET_KEY,
    {
      expiresIn: 15 * 60, // 15 minutes in seconds
    }
  );
  return `Bearer ${token}`;
};

exports.validateRegisterInput = (data) => {
  let errors = {};
  const { name, email, password } = data;
  if (!name || name == "" || name == null) {
    errors.name = "Name can not be empty!";
  }

  const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email || email == "" || email == null) {
    errors.email = "Email can not be empty!";
  } else if (!emailRegexp.test(email)) {
    errors.email = "Email is invalid!";
  }

  if (!password || password == "" || password == null) {
    errors.password = "Password can not be empty!";
  }

  if (password.lenth < 8 || password.lenth > 30) {
    errors.password = "Password must be between 8 to 30 characters!";
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (!passwordRegex.test(password)) {
    errors.password = "Invalid Password!";
  }
  return {
    errors,
    isValid: errors && Object.keys(errors).length == 0,
  };
};

exports.validateLoginInput = (data) => {
  const { email, password } = data;
  const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let isValid = true;

  if (!email || email == "" || email == null) {
    isValid = false;
  } else if (!emailRegexp.test(email)) {
    isValid = false;
  }

  if (!password || password == "" || password == null) {
    isValid = false;
  }
  return isValid;
};
