const dal = require("./pgDatabase");
const bcrypt = require('bcrypt');


//function to get all users from the database
var getUsers = function() {
  if(DEBUG) console.log("user.dal.getUsers()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM users";
    dal.query(sql, [], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log("inside the user.dal.getUser() success");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    });
  });
};

//functions to get one particular user from the database
var getUserByUsername = function(username) {
  if(DEBUG) console.log("user.dal.getUserByUsername()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT username, password from users WHERE username = $1";
    dal.query(sql, [username], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

//function to add a new entry into the database
var addUser = function(username, hashedPassword, email, ) {
  if(DEBUG) console.log("user.dal.addUser()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.users(username, password, email) VALUES ($1, $2, $3);";
    dal.query(sql, [username, hashedPassword, email], (err, result) => {
      if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
    });
  });
};

//function to replace or 'put' an user in the database
var putUser = function(username, password, email) {
  if(DEBUG) console.log("user.dal.putUser()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.users SET user_id = $1, user_id = $2, date = $3";
    dal.query(sql, [username, password, email], (err, result) => {
      if (err) {
          reject(err);
          console.log("reject")
        } else {
          resolve(result.rowCount);
          console.log("resolved");
        }
    });
  });
};

//function to edit of 'patch' an users in the database
var patchUser = function(username, password, email) {
  if(DEBUG) console.log("user.dal.patchUser()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.users SET username = $1, password = $2, email = $3";
    dal.query(sql, [username, password, email], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
          console.log("resolved");
        }
    });
  });
};

//function to delete a user in the database
var deleteUser = function(username) {
  if(DEBUG) console.log("user.dal.deleteUser()");
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM public.users WHERE username = $1;";
    dal.query(sql, [username], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    });
  });
};

//exports of all functions to be used in the application
module.exports = {
    getUsers,
    getUserByUsername,
    addUser,
    putUser,
    patchUser,
    deleteUser
}