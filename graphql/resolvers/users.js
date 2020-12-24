const Usre = require('../../models/Users');

module.exports = {
  Mutation: {
    register(parent, args, cotext, info) {
      // TODO: Validate user data
      // TODO: Make Sure user doesnt already exist
      // TODO: hash password and create auth token
    }
  }
}
// 49:30초