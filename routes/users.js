const express = require('express');
const router = express.Router();
const usersDal = require('../services/user.dal');
const bcrypt = require('bcrypt');

// https://localhost:3000/users/
router.get('/', async (req, res) => {
    try {
        let theUsers = await usersDal.getUsers();
        if(DEBUG) console.table(theUsers);
        res.render('users', {theUsers});
    } catch {
        res.render('503');
    }
});

// api/users/:id - will return one specific entry that matched a particular user_id from the database
router.get('/:id', async (req, res) => {
    try {
        const aUser = await usersDal.getUsersById(req.params.user_id);
        if(DEBUG) console.log(`users.router.get/:id ${aUser}`);
        if (aUser)
            res.render('users', {aUser});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
});

// this router will replace an entry in the database that matches the user_id
router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('users.Replace : ' + req.params.user_id);
    res.render('usersPut.ejs', { user_id: req.params.user_id, user_name: req.query.user_name, password: req.query.password});
});

//this will edit an entry in the database using the user_id
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('users.Edit : ' + req.params.user_id);
    res.render('usersPatch.ejs', {user_id: req.params.user_id, user_name: req.query.user_name, password: req.query.password});
});

//this will delete an entry from the database using the user_id
router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('users.Delete : ' + req.params.user_id);
    res.render('usersDelete.ejs', {user_id: req.params.user_id, user_name: req.query.user_name, password: req.query.password, email: req.query.password});
});

//router to post a new entry into the database
router.post('/', async (req, res) => {
    if(DEBUG) console.log("users.POST");
    try {
        const password = req.body.password;
        const saltRounds = 10;
        const hashedPassword =  await bcrypt.hash(password, saltRounds);

        await usersDal.addUser(req.body.username, hashedPassword, req.body.email );
        res.redirect('/login/');
    } catch {
        res.render('503');
    }
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML

router.put('/:id', async (req, res) => {
  if(DEBUG) console.log('users.PUT: ' + req.params.id);
  try {
      const password = req.body.password;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await usersDal.putUser(req.params.id, req.body.user_name, hashedPassword);
      res.redirect('/users/');
  } catch {
      res.render('503');
  }
});

router.patch('/:id', async (req, res) => {
  if(DEBUG) console.log('users.PATCH: ' + req.params.id);
  try {
      let hashedPassword = null;
      if (req.body.password) {
          const saltRounds = 10;
          hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      }

      await usersDal.patchUser(req.params.id, req.body.user_name, hashedPassword);
      res.redirect('/users/');
  } catch {
      res.render('503');
  }
});


router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('users.DELETE: ' + req.params.user_id);
    try {
        await usersDal.deleteUser(req.params.user_id);
        res.redirect('/users/');
    } catch (err) {
        if(DEBUG) console.error(err);
        res.render('503');
    }
});

module.exports = router