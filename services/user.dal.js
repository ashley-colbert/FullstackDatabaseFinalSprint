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
        if(DEBUG) console.log("inside the user.dal.getUser() success");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    });
  });
};

//functions to get one particular user from the database
var getUserById = function(user_id) {
  if(DEBUG) console.log("user.dal.getUserById()");
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
  if(DEBUG) console.log("user.dal.addUser()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.users(user_id, user_id, date) \
        VALUES ($1, $2, $3, $4);";
    dal.query(sql, [user_id, user_id, date], (err, result) => {
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
var putUser = function(user_id, user_id, date) {
  if(DEBUG) console.log("user.dal.putUser()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.users SET user_id = $1, user_id = $2, date = $3";
    dal.query(sql, [user_id, user_id, date], (err, result) => {
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
var patchUser = function(user_id, user_id, date) {
  if(DEBUG) console.log("user.dal.patchUser()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.users SET user_id = $1, user_id = $2, date = $3";
    dal.query(sql, [user_id, user_id, date], (err, result) => {
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
var deleteUser = function(user_id) {
  if(DEBUG) console.log("user.dal.deleteUser()");
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM public.users WHERE user_id = $1;";
    dal.query(sql, [user_id], (err, result) => {
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
    getUserById,
    addUser,
    putUser,
    patchUser,
    deleteUser
}