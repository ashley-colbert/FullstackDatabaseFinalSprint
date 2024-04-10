const express = require('express');
const router = express.Router();
const homeMDal = require('../services/homeMDB.dal');
const homePDal = require('../services/homePG.dal');

router.get('/', async (req, res) => {
  try {
      res.render('home');
  } catch {
      res.render('503');
  }
});

router.get('/mongo', async (req, res) => {
  const searchPhrase = req.query.phrase;
  if (!searchPhrase) {
    return res.render('homeMongo.ejs', { results: [], phrase: ''});
  }

  try {
    const results = await homeMDal.searchMongo(searchPhrase);
    res.render('homeMongo.ejs', { results: results, phrase: searchPhrase});
  } catch (error) {
    console.error(error);
    res.render('homeMongo.ejs', {error: 'Error performing mongo search' });
  }
});


router.get('/postgres', async (req, res) => {
  const searchPhrase = req.query.phrase;
  if(!searchPhrase) {
    return res.render('homePostgres.ejs', { results: [], phrase: ''});
  }
  try {
    const results = await homePDal.searchPostgres(searchPhrase);
    res.render('homePostgres.ejs', { results: results, phrase: searchPhrase});
  } catch (error) {
    console.error(error);
    res.render('home', {error: 'Error performing postgres search' });
  }
});

module.exports = router