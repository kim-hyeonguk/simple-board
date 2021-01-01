module.exports.validateRegisterInput = (
  userName,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (userName.trim() === '') {
    errors.userName = 'UserName must not be empty'
  } 

  if (email.trim() === '') {
    errors.email = 'Email must not be empty'
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-.\w]*[0-9a-zA-Z]\.)+[0-9a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Password must match'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (userName,password) => {
  const errors = {};

  if (userName.trim() === '') {
    errors.userName = 'UserName must not be empty'
  } 
  if (password.trim() === '') {
    errors.password = 'Password must not be empty'
  } 

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };

}