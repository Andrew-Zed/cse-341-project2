const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const { movieValidationRules, idValidationRule, validate } = require('../middleware/validators');

router.get('/', moviesController.getAll);

router.get('/:id', idValidationRule, validate, moviesController.getSingle);

router.post('/', movieValidationRules, validate, moviesController.createMovie);

router.put('/:id', idValidationRule, movieValidationRules, validate, moviesController.updateMovie);

router.delete('/:id', idValidationRule, validate, moviesController.deleteMovie);

module.exports = router;
