const dal = require("./pgDatabase");

//the data access layer for the orders table - all functions are used in the UI and the restfulAPI

//function to get all owners from the database
var getOwner = function() {
  if(DEBUG) console.log("owner.dal.getOwner()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM owner";
    dal.query(sql, [], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log("inside the orders.dal.getOwner() success");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    });
  });
};

//functions to get one particular owner from the database
var getOwnerById = function(owner_id) {
  if(DEBUG) console.log("owner.dal.getOwnerById()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * from owner WHERE owner_id = $1";
    dal.query(sql, [owner_id], (err, result) => {
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
var addOwner = function(name, age, email) {
  if(DEBUG) console.log("owner.dal.addOwner()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.owner(name, age, email) \
        VALUES ($1, $2, $3)";
    dal.query(sql, [name, age, email], (err, result) => {
      if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
    });
  });
};

//function to replace or 'put' an owner in the database
var putOwner = function(owner_id, name, age, email) {
  if(DEBUG) console.log("owner.dal.putOwner()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.owner SET owner_id = $1, name = $2, age = $3, email = $4";
    dal.query(sql, [owner_id, name, age, email], (err, result) => {
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

//function to edit of 'patch' an owner in the database
var patchOwner = function(owner_id, name, age, email) {
  if(DEBUG) console.log("owner.dal.patchOwner()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.owner SET owner_id = $1, name = $2, age = $3, email = $4";
    dal.query(sql, [owner_id, name, age, email], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
          console.log("resolved");
        }
    });
  });
};

//function to delete an owner in the database
var deleteOwner = function(owner_id) {
  if(DEBUG) console.log("owner.dal.deleteOwner()");
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM public.owner WHERE owner_id = $1;";
    dal.query(sql, [owner_id], (err, result) => {
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
    getOwner,
    getOwnerById,
    addOwner,
    putOwner,
    patchOwner,
    deleteOwner
}