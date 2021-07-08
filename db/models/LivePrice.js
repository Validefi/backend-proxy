const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const LivePrice = sequelize.define(
    'LivePrice',
    {
        currency: {
            type: DataTypes.STRING(10),
            unique: true,
            primaryKey: true,
        },
        value: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
    },
    {
        tableName: 'LivePrice',
    }
);

// (function seed() {
//     LivePrice.bulkCreate([
//         {
//             currency: 'USDT',
//             value: 1,
//         },
//         {
//             currency: 'BUSD',
//             value: 1,
//         },
//         {
//             currency: 'USDC',
//             value: 1,
//         },
//         {
//             currency: 'UST',
//             value: 1,
//         },
//     ]);
// })();

module.exports = LivePrice;
