const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');


router.post('/pets', petController.create);


router.get('/pets', petController.findAll);


router.get('/pets/:id', petController.findOne);


router.put('/pets/:id', petController.update);


router.delete('/pets/:id', petController.delete);

module.exports = router;
