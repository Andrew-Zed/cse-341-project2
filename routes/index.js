const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => { res.send('Hello, World!'); });

router.use('/movies', require('./movies'));
router.use('/reviews', require('./reviews'));

module.exports = router;
