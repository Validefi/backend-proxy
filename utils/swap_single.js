const LivePrice = require('../db/models/LivePrice');

async function swap_handle_single({
    coinsBefore,
    valueBefore,
    coinsAfter,
    valueAfter,
    currentValueBefore,
    currentValueAfter,
}) {
    const US_COINS = ['USDT', 'BUSD', 'USDC', 'UST'];

    if (US_COINS.includes(coinsAfter)) {
        valueBefore = valueAfter / valueBefore;
        await LivePrice.upsert(
            { value: valueBefore, currency: coinsBefore },
            { currency: coinsBefore }
        );
        return {
            status: 'success',
        };
    } else if (US_COINS.includes(coinsBefore)) {
        valueAfter = valueBefore / valueAfter;
        await LivePrice.upsert(
            { value: valueAfter, currency: coinsAfter },
            { currency: coinsAfter }
        );

        return {
            status: 'success',
        };
    } else {
        if (currentValueBefore != 0 && currentValueAfter == 0) {
            valueBefore = (currentValueAfter * valueAfter) / valueBefore;
            await LivePrice.upsert(
                { value: valueBefore, currency: coinsBefore },
                { currency: coinsBefore }
            );
            return {
                status: 'success',
            };
        } else if (currentValueBefore != 0 && currentValueAfter == 0) {
            valueAfter = (currentValueBefore * valueBefore) / valueAfter;
            await LivePrice.upsert(
                { value: valueAfter, currency: coinsAfter },
                { currency: coinsAfter }
            );
            return {
                status: 'success',
            };
        } else if (currentValueBefore == 0 && currentValueAfter == 0) {
            return {
                status: 'failure',
            };
        } else if (currentValueBefore != 0 && currentValueAfter != 0) {
            [valueAfter, valueBefore] = [
                (valueBefore * currentValueBefore) / valueAfter,
                (valueAfter * currentValueAfter) / valueBefore,
            ];
            await LivePrice.upsert(
                { value: valueBefore, currency: coinsBefore },
                { currency: coinsBefore }
            );
            await LivePrice.upsert(
                { value: valueAfter, currency: coinsAfter },
                { currency: coinsAfter }
            );
            return {
                status: 'success',
            };
        } else {
            return {
                status: 'failure',
            };
        }
    }
}

module.exports = swap_handle_single;
