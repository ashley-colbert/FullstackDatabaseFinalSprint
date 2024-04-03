const dal = require("./pgDatabase");

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
        if(DEBUG) console.log("inside the login.dal.getLogin() success");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    });
  });
};

//functions to get one particular login from the database
var getUsersById = function(user_id) {
  if(DEBUG) console.log("login.dal.getLoginById()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * from users WHERE user_id = $1";
    dal.query(sql, [user_id], (err, result) => {
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
var addUser = function(user_id, username, owner_id, ) {
  if(DEBUG) console.log("login.dal.addLogin()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.logins(login_id, user_id, date) \
        VALUES ($1, $2, $3, $4);";
    dal.query(sql, [login_id, user_id, date], (err, result) => {
      if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
    });
  });
};

//function to replace or 'put' an login in the database
var putLogin = function(login_id, user_id, date) {
  if(DEBUG) console.log("login.dal.putLogin()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.logins SET login_id = $1, user_id = $2, date = $3";
    dal.query(sql, [login_id, user_id, date], (err, result) => {
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

//function to edit of 'patch' an logins in the database
var patchLogin = function(login_id, user_id, date) {
  if(DEBUG) console.log("login.dal.patchLogin()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.logins SET login_id = $1, user_id = $2, date = $3";
    dal.query(sql, [login_id, user_id, date], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
          console.log("resolved");
        }
    });
  });
};

//function to delete a login in the database
var deleteLogin = function(login_id) {
  if(DEBUG) console.log("login.dal.deleteLogin()");
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM public.logins WHERE login_id = $1;";
    dal.query(sql, [login_id], (err, result) => {
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
    getLogin,
    getLoginById,
    addLogin,
    putLogin,
    patchLogin,
    deleteLogin
}