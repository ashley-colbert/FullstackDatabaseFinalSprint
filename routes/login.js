const express = require('express');
const router = express.Router();
const loginsDal = require('../services/login.dal')
const usersDal = require('../services/user.dal')
const bcrypt = require('bcrypt');
const session = require('express-session');


function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}


router.get('/', async (req, res) => {
    try {
        let theLogins = await loginsDal.getLogin();
        if(DEBUG) console.table(theLogins);
        const currentDate = getCurrentDate();
        res.render('login', {theLogins, currentDate});
    } catch {
        res.render('503');
    }
});

router.get('/:id', async (req, res) => {
;
  try {
      let aLogin = await loginsDal.getLoginByLoginId(req.params.id);
      const currentDate = getCurrentDate();
      if (aLogin.length === 0)
          res.render('norecord', { currentDate })
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
  try {
      const { username, password } = req.body;
      const user = await usersDal.getUserByUsername(username);

      if (user) {
          const match = await bcrypt.compare(password, user[0].password);
          if (match) {
              req.session.username = username;
              req.session.save((err) => {
                if(err) {
                  console.error(err);
                  res.render('login', { message: 'Session failed to save' })
                } else {
                  const currentDate = new Date().toISOString().split('T')[0];
                  loginsDal.addLogin(username, currentDate);
                  console.log("pets")
                  res.redirect('/home/');
                }
              });
          } else {
              res.render('login', {message: 'Invalid username or password.', currentDate: ''});
          }
      } else {
          res.render('login', {message: 'Invalid username or password.', currentDate: ''} );
      }
  } catch (error) {
      console.error(error);
      res.render('503', {currentDate: ''});
  }
});

router.patch('/:id', async (req, res) => {
  if(DEBUG) console.log('login.PATCH: ' + req.params.user_id);
  try {
      await loginsDal.patchLogin(req.params.user_id, req.body.username, req.body.password);
      res.redirect('/login/');
  } catch {
      res.render('503');
  }
});

router.delete('/:id', async (req, res) => {
  if(DEBUG) console.log('login.DELETE: ' + req.params.user_id);
  try {
      await loginsDal.deleteLogin(req.params.user_id)
  } catch {
      res.render('503');
  }
});

module.exports = router