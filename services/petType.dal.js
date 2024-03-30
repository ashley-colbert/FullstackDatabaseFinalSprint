const dal = require("./pgDatabase");

//the data access layer for the orders table - all functions are used in the UI and the restfulAPI

//function to get all pet types from the database
var getPetType = function() {
  if(DEBUG) console.log("petType.dal.getPetType()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM pet_type";
    dal.query(sql, [], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log("inside the petType.dal.getPetType() success");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    });
  });
};

//functions to get one particular pet type from the database
var getPetTypeById = function(type_id) {
  if(DEBUG) console.log("petType.dal.getPetTypeById()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * from owner WHERE type_id = $1";
    dal.query(sql, [type_id], (err, result) => {
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
var addPetType = function(type_id, name, life_expectancy, scientific_name) {
  if(DEBUG) console.log("petType.dal.addPetType()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.pet_type(type_id, name, life_expectancy, scientific_name \
        VALUES ($1, $2, $3, $4);";
    dal.query(sql, [type_id, name, life_expectancy, scientific_name], (err, result) => {
      if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
    });
  });
};

//function to replace or 'put' an pet type in the database
var putPetType = function(type_id, name, life_expectancy, scientific_name) {
  if(DEBUG) console.log("petType.dal.putPetType()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.pet_type(type_id, name, life_expectancy, scientific_name) \
    VALUES ($1, $2, $3, $4);";
    dal.query(sql, [type_id, name, life_expectancy, scientific_name], (err, result) => {
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

//function to edit of 'patch' a pet type in the database
var patchPetType = function(pet_id, pet_name, age, type_id, owner_id) {
  if(DEBUG) console.log("petType.dal.patchPetType()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.pets SET pet_id = $1, pet_name = $2, age = $3, type_id = $4, owner_id = $5";
    dal.query(sql, [pet_id, pet_name, age, type_id, owner_id], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
          console.log("resolved");
        }
    });
  });
};

//function to delete a pet type from the database
var deletePetType = function(pet_id) {
  if(DEBUG) console.log("petType.dal.deletePetType()");
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM public.pet_type WHERE type_id = $1;";
    dal.query(sql, [type_id], (err, result) => {
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
    getPetType,
    getPetTypeById,
    addPetType,
    putPetType,
    patchPetType,
    deletePetType
}