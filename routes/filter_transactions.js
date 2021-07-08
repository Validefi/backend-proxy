const router = require('express').Router();
const LivePrice = require('../db/models/LivePrice');
const { filterTransaction } = require('../utils/filter');

router.get('/', async (req, res) => {
    const { currency } = req.body;
    if (!currency) {
        return res.status(400).send({
            message: 'No currency specified',
        });
    }

    const value = (await LivePrice.findOne({ where: { currency } })).get(
        'value'
    );
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
