const express = require('express');
const router = express.Router();
const ownerDal = require('../services/owner.dal')

// https://localhost:3000/owners/
router.get('/', async (req, res) => {
    try {
        let thePets = await petsDal.getOwners();
        if(DEBUG) console.table(theOwners);
        res.render('owners', {theOwners});
    } catch {
        res.render('503');
    }
});

// api/pets/:id - will return one specific entry that matched a particular owner_id from the database
router.get('/:id', async (req, res) => {
    try {
        const anOwner = await ownersDal.getOwnerById(req.params.owner_id);
        if(DEBUG) console.log(`owners.router.get/:id ${anOwner}`);
        if (anOwner)
            res.render('pets', {anOwner});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
});

// this router will replace an entry in the database that matches the owner_id
router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('owner.Replace : ' + req.params.owner_id);
    res.render('petsPut.ejs', { owner_id: req.params.owner_id, name: req.query.name, age: req.query.age, email: req.query.email});
});

//this will edit an entry in the database using the owner_id
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('owner.Edit : ' + req.params.owner_id);
    res.render('ownerPatch.ejs', {  owner_id: req.params.owner_id, name: req.query.name, age: req.query.age, email: req.query.email});
});

//this will delete an entry from the database using the owner_id
router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('owner.Delete : ' + req.params.owner_id);
    res.render('ownersDelete.ejs', {owner_id: req.params.owner_id, name: req.query.name, age: req.query.age, email: req.query.email});
});

//router to post a new entry into the database
router.post('/', async (req, res) => {
    if(DEBUG) console.log("owner.POST");
    try {
        await ownerDal.addOwner(req.body.owner_id, req.query.name, req.query.age, req.query.email);
        res.redirect('/owners/');
    } catch {
        res.render('503');
    }
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('owners.PUT: ' + req.params.owner_id);
    try {
        await ownersDal.putOwner(req.body.owner_id, req.query.name, req.query.age, req.query.email);
        res.redirect('/pets/');
    } catch {
        res.render('503');
    }
});

router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('owner.PATCH: ' + req.params.owner_id);
    try {
        await ownerDal.patchOwner(req.body.owner_id, req.query.name, req.query.age, req.query.email);
        res.redirect('/owners/');
    } catch {
        res.render('503');
    }
});

router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('owner.DELETE: ' + req.params.owner_id);
    try {
        await petsDal.deleteOwner(req.params.owner_id);
        res.redirect('/owner/');
    } catch (err) {
        if(DEBUG) console.error(err);
        res.render('503');
    }
});

module.exports = router