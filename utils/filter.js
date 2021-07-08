const swap_handle_single = require('./swap_single');
const LivePrice = require('../db/models/LivePrice');

async function filterTransaction(description = '') {
    if (
        description.includes(' more ') ||
        description.includes('Cake-LP') ||
        description.includes(' more')
    ) {
        return {
            skipped: true,
        };
    } else if ((description.match(/and/g) || []).length) {
        return {
            skipped: true,
        };
    }

    const [string_before, string_after] = description.split('for');
    const [_, value_before, coins_before] = string_before.split(' ');
    const [value_after, coins_after] = string_after.substr(1).split(' ');

    const US_COINS = ['USDT', 'BUSD', 'USDC', 'UST'];

    if (US_COINS.includes(coins_before) && US_COINS.includes(coins_after)) {
        return {
            skipped: true,
        };
    } else if (coins_before == coins_after) {
        return {
            skipped: true,
        };
    } else if (value_before == 0 || value_after == 0) {
        return {
            skipped: true,
        };
    } else {
        const current_coin_before = await LivePrice.findOne({
            where: { currency: coins_before },
        });
        const current_value_coins_before =
            (current_coin_before && current_coin_before.get('value')) || 0;

        const current_coin_after = await LivePrice.findOne({
            where: { currency: coins_after },
        });

        const current_value_coins_after =
            (current_coin_after && current_coin_after.get('value')) || 0;

        const result = await swap_handle_single({
            coinsBefore: coins_before,
            valueBefore: value_before,
            coinsAfter: coins_after,
            valueAfter: value_after,
            currentValueBefore: current_value_coins_before,
            currentValueAfter: current_value_coins_after,
        });

        if (result.status == 'success') {
            console.log('Success');
            return {
                skipped: false,
                success: true,
            };
        } else {
            console.log('Failed to update the value');
            return {
                skipped: false,
                success: false,
            };
        }
    }
}

module.exports = {
    filterTransaction,
};

// Swapped 827207920000000000 ETH for 5764118338705201000 WBNB
// Swapped 0 SYRUP and 3 more for 0.0026 Cake and 5.1399 SYRUP
// Swapped 0 UNCL for 0 WBNB
// Swapped 0.01 WBNB for 372580049151.1716 LSHIBA
// Swapped 9.1394 BUSD for 9504085
// Swapped 8.6366 Cake for 152.1726 BUSD
