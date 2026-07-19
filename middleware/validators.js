const { body, param, validationResult } = require('express-validator');

const movieValidationRules = [
    body('title').trim().notEmpty().withMessage('title is required').isString(),
    body('director').trim().notEmpty().withMessage('director is required').isString(),
    body('releaseYear').notEmpty().withMessage('releaseYear is required')
        .isInt({ min: 1888, max: 2100 }).withMessage('releaseYear must be a valid year'),
    body('genre').trim().notEmpty().withMessage('genre is required').isString(),
    body('runtimeMinutes').notEmpty().withMessage('runtimeMinutes is required')
        .isInt({ min: 1 }).withMessage('runtimeMinutes must be a positive integer'),
    body('rating').trim().notEmpty().withMessage('rating is required').isString(),
    body('synopsis').trim().notEmpty().withMessage('synopsis is required').isString(),
    body('posterUrl').trim().notEmpty().withMessage('posterUrl is required').isURL().withMessage('posterUrl must be a valid URL'),
];

const reviewValidationRules = [
    body('movieId').trim().notEmpty().withMessage('movieId is required').isMongoId().withMessage('movieId must be a valid MongoDB ObjectId'),
    body('reviewerName').trim().notEmpty().withMessage('reviewerName is required').isString()
        .isLength({ min: 3 }).withMessage('reviewerName must be at least 3 characters long'),
    body('rating').notEmpty().withMessage('rating is required')
        .isInt({ min: 1, max: 5 }).withMessage('rating must be an integer between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('comment is required').isString(),
];

const idValidationRule = [
    param('id').isMongoId().withMessage('id must be a valid MongoDB ObjectId'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    movieValidationRules,
    reviewValidationRules,
    idValidationRule,
    validate,
};
