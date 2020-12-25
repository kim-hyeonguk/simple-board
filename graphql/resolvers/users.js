const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/Validators');
const {SECRET_KEY} = require('../../config');
const Users = require('../../models/Users');

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    userName: user.userName
  }, SECRET_KEY ,{ expiresIn: '1h' });
}

module.exports = {
  Mutation: {
    async login(_,{ userName, password}){
      const { errors, valid } = validateLoginInput(userName, password);
      const user = await Users.findOne({ userName });

      if(!valid) {
        throw new UserInputError('Errors', { errors });
      }

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user.id,
        token
      }
    },
    async register(
      parent, 
      {
        registerInput : { userName, email, password, confirmPassword}
      },   
      cotext, 
      info
      ) {
      // TODO: Validate user data
      const { valid, errors} = validateRegisterInput(userName,email,password,confirmPassword);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // TODO: Make Sure user doesnt already exist

      const user = await Users.findOne({ userName });
      if (user) {
        throw new UserInputError('User name is taken', {
          errors: {
            userName: 'This userName is taken'
          }
        })
      }

      // TODO: hash password and create auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new Users({
        email,
        userName,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res.id,
        token
      }
    }


  }
}
// 49:30초