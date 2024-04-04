const express = require('express');
const router = express.Router();
const petTypeDal = require('../services/petType.dal')

// https://localhost:3000/petType/
router.get('/', async (req, res) => {
    try {
        let thePetType = await petTypeDal.getPetType();
        if(DEBUG) console.table(thePetType);
        res.render('petType', {thePetType});
    } catch {
        res.render('503');
    }
});

// api/petType/:id - will return one specific entry that matched a particular type_id from the database
router.get('/:id', async (req, res) => {
    try {
        const aPetType = await petTypeDal.getPetTypeById(req.params.type_id);
        if(DEBUG) console.log(`petType.router.get/:id ${aPetType}`);
        if (aPetType)
            res.render('petType', {aPetType});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
});

// this router will replace an entry in the database that matches the type_id
router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('petType.Replace : ' + req.params.type_id);
    res.render('petTypePut.ejs', { type_id: req.params.type_id, name: req.query.name, life_expectancy: req.query.life_expectancy, scientific_name: req.query.scientific_name});
});

//this will edit an entry in the database using the type_id
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('petType.Edit : ' + req.params.type_id);
    res.render('petTypePatch.ejs', { type_id: req.params.type_id, name: req.query.name, life_expectancy: req.query.life_expectancy, scientific_name: req.query.scientific_name});
});

//this will delete an entry from the database using the type_id
router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('petType.Delete : ' + req.params.type_id);
    res.render('petTypeDelete.ejs', {type_id: req.params.type_id, name: req.query.name, life_expectancy: req.query.life_expectancy, scientific_name: req.query.scientific_name});
});

//router to post a new entry into the database
router.post('/', async (req, res) => {
    if(DEBUG) console.log("petType.POST");
    try {
        await petTypeDal.addPetType(req.body.type_id, req.query.name, req.query.life_expectancy, req.query.scientific_name);
        res.redirect('/petType/');
    } catch {
        res.render('503');
    }
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('petType.PUT: ' + req.params.type_id);
    try {
        await petTypeDal.putPetType(req.params.type_id, req.query.name, req.query.life_expectancy, req.query.scientific_name );
        res.redirect('/petType/');
    } catch {
        res.render('503');
    }
});

router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('petType.PATCH: ' + req.params.type_id);
    try {
        await petTypeDal.patchPetType(req.params.type_id, req.query.name, req.query.life_expectancy, req.query.scientific_name  );
        res.redirect('/petType/');
    } catch {
        res.render('503');
    }
});

router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('petType.DELETE: ' + req.params.type_id);
    try {
        await petTypeDal.deletePetType(req.params.type_id);
        res.redirect('/petType/');
    } catch (err) {
        if(DEBUG) console.error(err);
        res.render('503');
    }
});

module.exports = router