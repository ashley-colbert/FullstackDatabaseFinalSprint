const express = require('express');
const router = express.Router();
const loginsDal = require('../services/login.dal')

router.get('/', async (req, res) => {
    try {
        let theLogins = await loginsDal.getLogins();
        if(DEBUG) console.table(theLogins);
        res.render('logins', {theLogins});
    } catch {
        res.render('503');
    }
});

router.get('/:id', async (req, res) => {
;
  try {
      let aLogin = await loginsDal.getLoginByLoginId(req.params.id);
      if (aLogin.length === 0)
          res.render('norecord')
      else
          res.render('login', {aLogin});
  } catch {
      res.render('503');
  }
});

router.get('/:id/delete', async (req, res) => {
  if(DEBUG) console.log('login.Delete : ' + req.params.user_id);
  res.render('loginDelete.ejs', {username: req.query.username, theId: req.params.user_id});
});

router.get('/:id/edit', async (req, res) => {
  if(DEBUG) console.log('login.Edit : ' + req.params.user_id);
  res.render('loginPatch.ejs', {username: req.query.username, theId: req.params.user_id});
});

router.post('/', async (req, res) => {
  if(DEBUG) console.log("logins.POST");
  try {
      await loginsDal.addLogin(req.body.username, req.body.password);
      res.redirect('/logins/');
  } catch {
      res.render('503');
  } 
});

router.patch('/:id', async (req, res) => {
  if(DEBUG) console.log('logins.PATCH: ' + req.params.user_id);
  try {
      await loginsDal.patchLogin(req.params.user_id, req.body.username, req.body.password);
      res.redirect('/logins/');
  } catch {
      res.render('503');
  }
});
router.delete('/:id', async (req, res) => {
  if(DEBUG) console.log('logins.DELETE: ' + req.params.user_id);
  try {
      await loginsDal.deleteLogin(req.params.user_id)
  } catch {
      res.render('503');
  }
});

module.exports = router