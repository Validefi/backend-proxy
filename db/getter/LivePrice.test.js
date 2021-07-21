require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const { getPrice, getCoin } = require('./LivePrice');

const US_COINS = [
    {
        currency: 'USDT',
        value: '1',
    },
    {
        currency: 'BUSD',
        value: '1',
    },
    {
        currency: 'USDC',
        value: '1',
    },
    {
        currency: 'UST',
        value: '1',
    },
];

test('Get price test', async () => {
    expect.assertions(US_COINS.length);
    for (let i = 0; i < US_COINS.length; i++) {
        const coin = US_COINS[i];
        const price = await getPrice(coin.currency);
        expect(price).toEqual(1);
    }
});
