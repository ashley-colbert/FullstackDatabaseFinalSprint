const dal = require("./pgDatabase");

function searchPostgres(phrase) {
  return new Promise((resolve, reject) => {
    dal.connect()
      .then(conn => {
        dal = conn;
        const query = 'SELECT * FROM pets, owner WHERE pet_name ILIKE $1 OR name ILIKE $1';
        const values = [`%${phrase}%`];
        return dal.query(query, values);
      })
      .then(result => {
        resolve(result.rows);
      })
      .catch(error => {
        reject(error);
      })
      .finally(() => {
        if (dal) {
          dal.release();
        }
      });
  });
}

module.exports = {
  searchPostgres,
}