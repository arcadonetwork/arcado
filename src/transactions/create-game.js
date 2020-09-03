const { BaseTransaction, TransactionError, utils } = require('@liskhq/lisk-transactions');

/**
 * Create new tournament with details
 */
class CreateGameTransaction extends BaseTransaction {

    static get TYPE () {
        return 34;
    }

    static get FEE () {
        return '0';
    };

    async prepare(store) {
        await store.account.cache([
            {
                address: "11237980039345381032L", // genesis
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
        const genesis = store.account.get("11237980039345381032L");
        let asset = {
            games: [],
            ...genesis.asset
        }

        asset.games.push({
            createdBy: this.asset.address,
            name: this.asset.name,
            gameId: this.asset.gameId
        })

        const updatedGenesis = {
            ...genesis,
            asset
        };
        store.account.set(genesis.address, updatedGenesis);

        // No need for balance property in game object
        // Don't need this property as we can calculate the players * entryFee and use the distribution to pay out
        const player = store.account.get(this.asset.address);
        const playerBalance = new utils.BigNum(player.balance);
        const entryFeeBalance = new utils.BigNum("25")
        const updatedPlayerBalance = playerBalance.sub(entryFeeBalance);
        const updatedPlayer = {
            ...player,
            balance: updatedPlayerBalance.toString()
        }

        store.account.set(player.address, updatedPlayer);

        return errors;
    }

    undoAsset(store) {
        // Add entryfee back to user balance
        const errors = [];
        const genesis = store.account.get("11237980039345381032L");

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
