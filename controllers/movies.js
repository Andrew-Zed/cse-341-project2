const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    //#swagger.tags = ['Movies']
    try {
        const movies = await mongodb.getDatabase().db().collection('movies').find().toArray();
        res.status(200).json(movies);
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    //#swagger.tags = ['Movies']
    try {
        const movie = await mongodb.getDatabase().db().collection('movies').findOne({ _id: new ObjectId(req.params.id) });
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (err) {
        next(err);
    }
};

const createMovie = async (req, res, next) => {
    //#swagger.tags = ['Movies']
    try {
        const { title, director, releaseYear, genre, runtimeMinutes, rating, synopsis, posterUrl } = req.body;
        const movie = { title, director, releaseYear, genre, runtimeMinutes, rating, synopsis, posterUrl };
        const result = await mongodb.getDatabase().db().collection('movies').insertOne(movie);

        if (!result.acknowledged) {
            return res.status(500).json({ error: 'Failed to create movie' });
        }
        res.status(201).json({ _id: result.insertedId, ...movie });
    } catch (err) {
        next(err);
    }
};

const updateMovie = async (req, res, next) => {
    //#swagger.tags = ['Movies']
    try {
        const { title, director, releaseYear, genre, runtimeMinutes, rating, synopsis, posterUrl } = req.body;
        const result = await mongodb.getDatabase().db().collection('movies').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { title, director, releaseYear, genre, runtimeMinutes, rating, synopsis, posterUrl } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie updated successfully' });
    } catch (err) {
        next(err);
    }
};

const deleteMovie = async (req, res, next) => {
    //#swagger.tags = ['Movies']
    try {
        const result = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie,
};
