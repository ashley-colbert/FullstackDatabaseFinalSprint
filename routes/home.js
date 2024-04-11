const express = require('express');
const router = express.Router();
const homeMDal = require('../services/homeMDB.dal');
const homePDal = require('../services/homePG.dal');
const { logSearch } = require('../config/logger');

router.get('/', async (req, res) => {
  if (req.session.username) {
      res.render('home', {username: req.session.username });
  } else {
      res.redirect('/login');
  }
});

router.get('/mongo', async (req, res) => {
  const searchPhrase = req.query.phrase;
  if (!searchPhrase) {
    return res.render('homeMongo.ejs', { results: [], phrase: ''});
  }
  try {
    const results = await homeMDal.searchMongo(searchPhrase);
    logSearch(searchPhrase, req.session.username);
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
    logSearch(searchPhrase, req.session.username);
    res.render('homePostgres.ejs', { results: results, phrase: searchPhrase});
  } catch (error) {
    console.error(error);
    res.render('home', {error: 'Error performing postgres search' });
  }
});

router.post('/mongo', async (req, res) => {
  try {
    const searchPhrase = req.body.phrase;
    const username = req.session.username;
    logSearch(searchPhrase, username);
  } catch (error) {
    console.error(error);
  }
});

router.post('/postgres', async (req, res) => {
  try {
    const searchPhrase = req.body.phrase;
    const username = req.session.username;
    logSearch(searchPhrase, username);
  } catch (error) {
    console.error(error);
  }
});


router.get('/test-session', (req, res) => {
  if (req.session.username) {
    res.send(`Session is working! Username: ${req.session.username}`);
  } else {
    res.send('Session is not working.');
  }
});

module.exports = router