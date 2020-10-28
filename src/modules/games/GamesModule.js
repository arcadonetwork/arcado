const { BaseModule } = require("lisk-sdk");

const {
	CreateGameTransaction } = require('@arcado/arcado-transactions');


class GamesModule extends BaseModule {
	name = "tournaments";
	id = 1000;
	transactionAssets = [
		new CreateGameTransaction()
	]
}

module.exports = GamesModule;
