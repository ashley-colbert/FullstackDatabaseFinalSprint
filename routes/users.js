const express = require('express');
const router = express.Router();
const usersDal = require('../services/user.dal')

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
        await usersDal.addUser(req.query.user_name, req.query.password, req.query.email );
        res.redirect('/users/');
    } catch {
        res.render('503');
    }
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('users.PUT: ' + req.params.user_id);
    try {
        await usersDal.putUser(req.params.user_id, req.query.user_name, req.query.password);
        res.redirect('/users/');
    } catch {
        res.render('503');
    }
});

router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('users.PATCH: ' + req.params.user_id);
    try {
        await usersDal.patchUsers(req.params.user_id, req.query.user_name, req.query.password);
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