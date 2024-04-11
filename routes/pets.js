const express = require('express');
const router = express.Router();
const petsDal = require('../services/pets.dal')

// https://localhost:3000/pets/
router.get('/', async (req, res) => {
    try {
        let thePets = await petsDal.getPets();
        if(DEBUG) console.table(thePets);
        res.render('pets', {thePets});
    } catch {
        res.render('503');
    }
});

// api/pets/:id - will return one specific entry that matched a particular pet_id from the database
router.get('/:id', async (req, res) => {
    try {
        const aPet = await petsDal.getPetsById(req.params.pet_id);
        if(DEBUG) console.log(`pets.router.get/:id ${aPet}`);
        if (aPet)
            res.render('pets', {aPet});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
});

// this router will replace an entry in the database that matches the pet_id
router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('pets.Replace : ' + req.params.pet_id);
    res.render('petsPut.ejs', { pet_id: req.params.pet_id, pet_name: req.query.pet_name, age: req.query.age, type_Id: req.query.type_id, owner_id: req.query.owner_id});
});

//this will edit an entry in the database using the pet_id
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('pets.Edit : ' + req.params.pet_id);
    res.render('petsPatch.ejs', { pet_id: req.params.pet_id, pet_name: req.query.pet_name, age: req.query.age, type_Id: req.query.type_id, owner_id: req.query.owner_id});
});

//this will delete an entry from the database using the pet_id
router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('pets.Delete : ' + req.params.pet_id);
    res.render('petsDelete.ejs', {pet_id: req.params.pet_id, pet_name: req.query.pet_name, age: req.query.age, type_Id: req.query.type_id, owner_id: req.query.owner_id});
});

//router to post a new entry into the database
router.post('/', async (req, res) => {
    if(DEBUG) console.log("pets.POST");
    try {
        await petsDal.addPet(req.body.pet_name, req.body.age, req.body.type_id, req.body.owner_id);
        res.redirect('/home/');
    } catch {
        res.render('503');
    }
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('pets.PUT: ' + req.params.pet_id);
    try {
        await petsDal.putPet(req.params.pet_id, req.query.pet_name, req.query.age, req.query.type_id, req.query.owner_id );
        res.redirect('/pets/');
    } catch {
        res.render('503');
    }
});

router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('pets.PATCH: ' + req.params.pet_id);
    try {
        await petsDal.patchPets(req.params.pet_id, req.query.pet_name, req.query.age, req.query.type_id, req.query.owner_id );
        res.redirect('/pets/');
    } catch {
        res.render('503');
    }
});

router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('pets.DELETE: ' + req.params.pet_id);
    try {
        await petsDal.deletePet(req.params.pet_id);
        res.redirect('/pets/');
    } catch (err) {
        if(DEBUG) console.error(err);
        res.render('503');
    }
});

module.exports = router