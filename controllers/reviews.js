const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    //#swagger.tags = ['Reviews']
    try {
        const reviews = await mongodb.getDatabase().db().collection('reviews').find().toArray();
        res.status(200).json(reviews);
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    //#swagger.tags = ['Reviews']
    try {
        const review = await mongodb.getDatabase().db().collection('reviews').findOne({ _id: new ObjectId(req.params.id) });
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (err) {
        next(err);
    }
};

const createReview = async (req, res, next) => {
    //#swagger.tags = ['Reviews']
    try {
        const { movieId, reviewerName, rating, comment } = req.body;

        const movie = await mongodb.getDatabase().db().collection('movies').findOne({ _id: new ObjectId(movieId) });
        if (!movie) {
            return res.status(400).json({ error: 'movieId does not match an existing movie' });
        }

        const review = { movieId: new ObjectId(movieId), reviewerName, rating, comment, createdAt: new Date() };
        const result = await mongodb.getDatabase().db().collection('reviews').insertOne(review);

        if (!result.acknowledged) {
            return res.status(500).json({ error: 'Failed to create review' });
        }
        res.status(201).json({ _id: result.insertedId, ...review });
    } catch (err) {
        next(err);
    }
};

const updateReview = async (req, res, next) => {
    //#swagger.tags = ['Reviews']
    try {
        const { movieId, reviewerName, rating, comment } = req.body;

        const movie = await mongodb.getDatabase().db().collection('movies').findOne({ _id: new ObjectId(movieId) });
        if (!movie) {
            return res.status(400).json({ error: 'movieId does not match an existing movie' });
        }

        const result = await mongodb.getDatabase().db().collection('reviews').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { movieId: new ObjectId(movieId), reviewerName, rating, comment } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({ message: 'Review updated successfully' });
    } catch (err) {
        next(err);
    }
};

const deleteReview = async (req, res, next) => {
    //#swagger.tags = ['Reviews']
    try {
        const result = await mongodb.getDatabase().db().collection('reviews').deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getSingle,
    createReview,
    updateReview,
    deleteReview,
};
