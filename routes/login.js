const express = require('express');
const router = express.Router();
const loginsDal = require('../services/login.dal')


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

// router.post('/', async (req, res) => {
//   if(DEBUG) console.log("login.POST");
//   try {
//       await loginsDal.addLogin(req.body.username, req.body.date);
//       res.redirect('/login/');
//   } catch {
//       res.render('503');
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//       const { username, password } = req.body;
//       const user = await usersDal.getUserByUsername(username);

//       if (user) {
//           const match = await bcrypt.compare(password, user.hashedPassword);
//           if (match) {

//               res.redirect('/index');
//           } else {
//               res.render('login', { message: 'Invalid username or password.' });
//           }
//       } else {
//           res.render('login', { message: 'Invalid username or password.' });
//       }
//   } catch (error) {
//       console.error(error);
//       res.render('503');
//   }
// });

router.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;
      const user = await usersDal.getUserByUsername(username);

      if (user) {

          const match = await bcrypt.compare(password, user.hashedPassword);
          if (match) {
              const currentDate = new Date().toISOString().split('T')[0];
              await loginsDal.addLogin(username, currentDate);
              res.redirect('/login/');
          } else {
              res.render('login', 'Invalid username or password.' );
          }
      } else {
          res.render('login',  'Invalid username or password.' );
      }
  } catch (error) {
      console.error(error);
      res.render('503');
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