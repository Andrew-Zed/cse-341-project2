const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviews');
const { reviewValidationRules, idValidationRule, validate } = require('../middleware/validators');

router.get('/', reviewsController.getAll);

router.get('/:id', idValidationRule, validate, reviewsController.getSingle);

router.post('/', reviewValidationRules, validate, reviewsController.createReview);

router.put('/:id', idValidationRule, reviewValidationRules, validate, reviewsController.updateReview);

router.delete('/:id', idValidationRule, validate, reviewsController.deleteReview);

module.exports = router;
