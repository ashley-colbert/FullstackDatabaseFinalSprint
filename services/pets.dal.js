const dal = require("./pgDatabase");

//the data access layer for the orders table - all functions are used in the UI and the restfulAPI

//function to get all pets from the database
var getPets = function() {
  if(DEBUG) console.log("pets.dal.getPets()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM pets";
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

//functions to get one particular pet from the database
var getPetById = function(pet_id) {
  if(DEBUG) console.log("pets.dal.getPetById()");
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
var addPet = function(pet_id, pet_name, age, type_id, owner_id) {
  if(DEBUG) console.log("pets.dal.addPet()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.pet(pet_id, pet_name, age, type_id, owner_id) \
        VALUES ($1, $2, $3, $4, $5);";
    dal.query(sql, [pet_id, pet_name, age, type_id, owner_id], (err, result) => {
      if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
    });
  });
};

//function to replace or 'put' an pet in the database
var putPet = function(pet_id, pet_name, age, type_id, owner_id) {
  if(DEBUG) console.log("pet.dal.putPet()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.pet(pet_id, pet_name, age, type_id, owner_id) \
    VALUES ($1, $2, $3, $4, $5);";
    dal.query(sql, [pet_id, pet_name, age, type_id, owner_id], (err, result) => {
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

//function to edit of 'patch' a pet in the database
var patchPet = function(pet_id, pet_name, age, type_id, owner_id) {
  if(DEBUG) console.log("pet.dal.patchPet()");
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

//function to delete an pet in the database
var deletePet = function(pet_id) {
  if(DEBUG) console.log("pets.dal.deletePet()");
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM public.pet WHERE pet_id = $1;";
    dal.query(sql, [pet_id], (err, result) => {
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
    getPets,
    getPetById,
    addPet,
    putPet,
    patchPet,
    deletePet
}