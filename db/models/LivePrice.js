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
            type: DataTypes.STRING(40),
            defaultValue: '0',
        },
    },
    {
        tableName: 'LivePrice',
    }
);

// sequelize.sync();

// (function seed() {
//     LivePrice.bulkCreate([
//         {
//             currency: 'USDT',
//             value: '1',
//         },
//         {
//             currency: 'BUSD',
//             value: '1',
//         },
//         {
//             currency: 'USDC',
//             value: '1',
//         },
//         {
//             currency: 'UST',
//             value: '1',
//         },
//     ]);
// })();

// LivePrice.sync({ force: true });

module.exports = LivePrice;
