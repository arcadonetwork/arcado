const { BaseModule } = require("lisk-sdk");

const CreateGameAsset = require('./transactions/create-game');
const { getAllAsJson } = require('./helpers');


class GamesModule extends BaseModule {
	name = "games";
	id = 1000;
	transactionAssets = [
		new CreateGameAsset()
	]

	actions = {
		getAll: async () => getAllAsJson(this._dataAccess),
	};
}

module.exports = GamesModule;
