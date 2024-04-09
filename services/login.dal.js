const dal = require("./pgDatabase");

//function to get all users from the database
var getLogin = function() {
  if(DEBUG) console.log("login.dal.getLogin()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM logins";
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
var getLoginByUsername = function(username) {
  if(DEBUG) console.log("login.dal.getLoginByUsername()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * from logins WHERE username = $1";
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
var addLogin = function(username, date) {
  if(DEBUG) console.log("login.dal.addLogin()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.logins(username, date) \
        VALUES ($1, $2);";
    dal.query(sql, [username, date], (err, result) => {
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
var putLogin = function(username, date) {
  if(DEBUG) console.log("login.dal.putLogin()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.logins SET username = $1, date = $3";
    dal.query(sql, [username, date], (err, result) => {
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
var patchLogin = function(username, date) {
  if(DEBUG) console.log("login.dal.patchLogin()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.logins SET username = $1, date = $2";
    dal.query(sql, [username, date], (err, result) => {
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
var deleteLogin = function(username) {
  if(DEBUG) console.log("login.dal.deleteLogin()");
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM public.logins WHERE username = $1;";
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
    getLogin,
    getLoginByUsername,
    addLogin,
    putLogin,
    patchLogin,
    deleteLogin
}