const { filterTransaction } = require('./filter');
const { getPrice } = require('../db/getter/LivePrice');

const data = [
    {
        coin: 'abc',
        value: 48.400099999999995,
        description: `Swapped 242.0005 USDT for 5 abc`,
    },
];

test('Filter transaction test', async () => {
    const length = data.length;
    expect.assertions(length);
    for (let i = 0; i < length; i++) {
        const { coin, value, description } = data[i];
        await filterTransaction(description);
        const val = await getPrice(coin);
        expect(val).toBeCloseTo(value, 6);
    }
});
