const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');


router.post('/Jobs', jobController.create);


router.get('/Jobs', jobController.findAll);


router.get('/Jobs/:id', jobController.findOne);


router.put('/Jobs/:id', jobController.update);


router.delete('/Jobs/:id', jobController.delete);

module.exports = router;
