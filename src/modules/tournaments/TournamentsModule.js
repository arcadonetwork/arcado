const { BaseModule } = require("lisk-sdk");

const {
	CreateTournamentTransaction,
	JoinTournamentTransaction,
	StartTournamentTransaction,
	StopTournamentTransaction } = require('@arcado/arcado-transactions');


class TournamentsModule extends BaseModule {
	name = "tournaments";
	id = 1000;
	transactionAssets = [
		new CreateTournamentTransaction(),
		new JoinTournamentTransaction(),
		new StartTournamentTransaction(),
		new StopTournamentTransaction()
	]
}

module.exports = TournamentsModule;
