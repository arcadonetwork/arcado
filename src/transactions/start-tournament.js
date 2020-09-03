const { BaseTransaction, TransactionError, utils } = require('@liskhq/lisk-transactions');


/**
 * Start the created tournament
 */
class StartTournamentTransaction extends BaseTransaction {

    static get TYPE () {
        return 32;
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
        return [];
    }

    applyAsset(store) {
        const errors = [];
        const genesis = store.account.get("11237980039345381032L");

        // Check if sender is the owner of the tournament otherwise reject
        const tournament = genesis.asset.tournaments.find(tournament => tournament.tournamentId === this.asset.tournamentId)
        if (tournament.createdBy !== this.asset.address) {
            errors.push(
                new TransactionError(
                    '"asset.address" does not match createdBy field for tournament - you are not the owner of the tournament',
                    this.id,
                    '.asset.address',
                    this.asset.address,
                    tournament.createdBy
                )
            );
            return errors;
        }

        let asset = {
            ...genesis.asset
        }

        const tournamentIndex = asset.tournaments.findIndex(tournament => tournament.tournamentId === this.asset.tournamentId)
        asset.tournaments[tournamentIndex].status = 1 // started

        const updatedGenesis = {
            ...genesis,
            asset
        };
        store.account.set(genesis.address, updatedGenesis);

        return errors;
    }

    /* Revert status game */
    undoAsset(store) {
        const errors = [];
        const genesis = store.account.get("11237980039345381032L");

        const tournamentIndex = genesis.asset.tournaments.findIndex(tournament => tournament.tournamentId === this.asset.tournamentId)

        let asset = {
            ...genesis.asset
        }
        asset.tournaments[tournamentIndex].status = 0
        const updatedGenesis = {
            ...genesis,
            asset
        };
        store.account.set(genesis.address, updatedGenesis);

        return errors;
    }

}

module.exports = StartTournamentTransaction;
