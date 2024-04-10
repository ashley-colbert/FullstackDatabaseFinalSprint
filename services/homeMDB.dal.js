const dal = require("./mongodb");

// function searchMongo(phrase) {
//   return new Promise((resolve, reject) =>  {
//     then(() => {
//         const database = dal.db('pets');
//         const collection1 = database.collection('animal_fact');
//         const collection2 = database.collection('cat_pics');
//         const collection3 = database.collection('dog_pics');

//         const query = { $text: { $search: phrase } };
//         return Promise.all([
//           collection1.find(query).toArray(),
//           collection2.find(query).toArray(),
//           collection3.find(query).toArray(),
//         ])
//       })
//       .then(results => {
//         const allResults = results.flat();
//         resolve(allResults);
//       })
//       .catch(error => {
//         reject(error);
//   });
// })
// }

// function searchMongo(phrase) {
//   return new Promise((resolve, reject) => {
//     dal.connect().then(() => {
//       const database = dal.db('pets');
//       const collection1 = database.collection('animal_fact');
//       const collection2 = database.collection('cat_pics');
//       const collection3 = database.collection('dog_pics');

//       const query = { $text: { $search: phrase } };
//       return Promise.all([
//         collection1.find(query).toArray(),
//         collection2.find(query).toArray(),
//         collection3.find(query).toArray(),
//       ]);
//     })
//     .then(results => {
//       const allResults = results.flat();
//       resolve(allResults);
//     })
//     .catch(error => {
//       reject(error);
//     });
//   });
// }

async function searchMongo(phrase) {
  try {
    await dal.connect();
    const database = dal.db('pets');
    const collection1 = database.collection('animal_fact');
    const collection2 = database.collection('cat_pics');
    const collection3 = database.collection('dog_pics');

    const query = { $text: { $search: phrase } };
    const results1 = await collection1.find(query).toArray();
    const results2 = await collection2.find(query).toArray();
    const results3 = await collection3.find(query).toArray();

    const allResults = [...results1, ...results2, ...results3];
    return allResults;
  } catch (error) {
 
    throw error;
  } finally {
  
  }
}

module.exports = {
  searchMongo,
}