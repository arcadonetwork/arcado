const { BaseTransaction, TransactionError, utils } = require('@liskhq/lisk-transactions');
const { TRANSACTION_TYPES, NETWORK } = require('../utils/constants');

/**
 * Join active tournament
 * 1. Check if tournament exists and if maxPlayers has been reached
 * 2. Check balance of user to pay entryFee
 * 3. Add user to game object in asset of genesis account
 */
class JoinTournamentTransaction extends BaseTransaction {

    static get TYPE () {
        return TRANSACTION_TYPES.JOIN_TOURNAMENT;
    }

    static get FEE () {
        return '0';
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
        return [];
    }

    applyAsset(store) {
        const errors = [];
        const genesis = store.account.get(NETWORK.GENESIS);
        const player = store.account.get(this.asset.address);

        const tournament = genesis.asset.tournaments.find(tournament => tournament.tournamentId === this.asset.tournamentId)
        if (!tournament) {
            errors.push(
                new TransactionError(
                    '"asset.tournamentId" does not exist',
                    this.id,
                    '.asset.tournamentId',
                    this.asset.tournamentId
                )
            );
            return errors;
        }

        if (tournament.participants.length >= tournament.maxPlayers) {
            errors.push(
                new TransactionError(
                    'Tournament is already full',
                    this.id,
                    '.asset.maxPlayers',
                    tournament.maxPlayers
                )
            );
            return errors;
        }

        const playerBalance = new utils.BigNum(player.balance);
        if (playerBalance.lt(tournament.entryFee)) {
            errors.push(
                new TransactionError(
                    'Insufficient balance for player',
                    this.id,
                    '.asset.entryFee',
                    player.balance
                )
            );
            return errors;
        }

        let asset = {
            ...genesis.asset
        }

        const tournamentIndex = asset.tournaments.findIndex(tournament => tournament.tournamentId === this.asset.tournamentId)
        asset.tournaments[tournamentIndex].participants.push(this.asset.address)

        const updatedGenesis = {
            ...genesis,
            asset
        };
        store.account.set(genesis.address, updatedGenesis);

        // Substract fee from user
        const entryFeeBalance = new utils.BigNum(tournament.entryFee)
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

        return errors;
    }

}

module.exports = JoinTournamentTransaction
