const router = require('express').Router();
const { getPrice } = require('../db/getter/LivePrice');
const { filterTransaction } = require('../utils/filter');

router.get('/', async (req, res) => {
    const { currency } = req.body;
    if (!currency) {
        return res.status(400).send({
            message: 'No currency specified',
        });
    }

    const value = await getPrice(currency);
    return res.status(200).send({
        message: 'Success',
        value,
    });
});

router.post('/', async (req, res) => {
    const result = await filterTransaction(req.body.description);
    res.json(result);
});

module.exports = router;
