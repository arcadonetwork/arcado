const { BaseTransaction, TransactionError, utils } = require('@liskhq/lisk-transactions');
const { FEES, TRANSACTION_TYPES, NETWORK } = require('../utils/constants');

/**
 * Create new tournament with details
 */

class CreateGameTransaction extends BaseTransaction {

    static get TYPE () {
        return TRANSACTION_TYPES.GAMES;
    }

    static get FEE () {
        return utils.convertLSKToBeddows(FEES.createGame)
    };

    async prepare(store) {
        await store.account.cache([
            {
                address: NETWORK.GENESIS, // genesis
            },
            {
                address: this.asset.address,
            }
        ]);
    }

    validateAsset() {
        const errors = [];
        if (this.asset.gameId === '') {
            errors.push(
                new TransactionError(
                    'Invalid "asset.gameId" defined on transaction',
                    this.id,
                    '.asset.gameId',
                    this.asset.gameId
                )
            );
        }

        return errors;
    }

    applyAsset(store) {
        const errors = [];
        const genesis = store.account.get(NETWORK.GENESIS);
        let asset = {
            games: [],
            ...genesis.asset
        }

        asset.games.push({
            createdBy: this.asset.address,
            name: this.asset.name,
            description: this.asset.description,
            gameId: this.asset.gameId
        })

        const updatedGenesis = {
            ...genesis,
            asset
        };

        store.account.set(genesis.address, updatedGenesis);
        return errors;
    }

    undoAsset(store) {
        // Add entryfee back to user balance
        const errors = [];
        const genesis = store.account.get(NETWORK.GENESIS);

        const gameIndex = genesis.asset.games.findIndex(game => game.gameId === this.asset.gameId)

        let asset = {
            ...genesis.asset
        }
        asset.games.splice(gameIndex, 1)
        const updatedGenesis = {
            ...genesis,
            asset
        };
        store.account.set(genesis.address, updatedGenesis);

        return errors;
    }

}

module.exports = CreateGameTransaction;
