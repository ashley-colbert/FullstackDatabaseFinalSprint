const dal = require("./pgDatabase");

//function to search the pets database using a keyword

var searchPostgres = function(phrase) {
  if(DEBUG) console.log("searchPostgres function called with phrase:", phrase);
  return new Promise(function(resolve, reject) {
    const sql = "SELECT \
    owner.name AS owner_name, \
    owner.owner_id, \
    pets.pet_name, \
    pet_type.name AS pet_type_name \
  FROM owner \
  JOIN pets ON pets.owner_id = owner.owner_id \
  JOIN pet_type ON pets.type_id = pet_type.type_id \
  WHERE \
    owner.name ILIKE $1 OR \
    pets.pet_name ILIKE $1 OR \
    pet_type.name ILIKE $1;"
    const values = [`%${phrase}%`];
    dal.query(sql, values, (err, result) => {
      if (err) {
        if(DEBUG) console.log("Error in searchPostgres:", err);
        reject(err);
      } else {
        if(DEBUG) console.log("searchPostgres success, results:", result.rows);
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  searchPostgres,
}