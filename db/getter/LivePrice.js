const LivePrice = require('../models/LivePrice');

async function getPrice(currency) {
    try {
        return parseFloat((await getCoin(currency)).get('value'));
    } catch (err) {
        console.log('abcde', err);
    }
}

async function getCoin(currency) {
    return await LivePrice.findOne({ where: { currency } });
}

module.exports = {
    getPrice,
    getCoin,
};
