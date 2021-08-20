'use strict';

const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
//middleware to verify the authentication of the user
exports.authenticateUser = async (req, res, next) => {
    let message;
    const credentials = auth(req);
    //if the user send some credentials
    if (credentials) {
      const user = await User.findOne({where:{emailAddress:credentials.name}});
      //if the user existes already in the database
      if (user) {
        const authenticated = bcrypt
          .compareSync(credentials.pass, user.password);
        //verifies if the password sent by the user matches the password stored on the database
        if (authenticated) {
          console.log(`Authentication successful for username: ${user.emailAddress}`);
          req.currentUser = user;
        } else {
          message = `Authentication failure for username: ${user.emailAddress}`;
        }
      } else {
        message = `User not found for username: ${credentials.emailAddress}`;
      }
    } else {
      message = 'Auth header not found';
    }
    //if there are no credentials,the user is not in the databse or the password is wrong
    //a message will be displayed denying access
    if (message) {
      console.warn(message);
      res.status(401).json({ message: 'Access Denied' });
    } else {
      next();
    }
  };