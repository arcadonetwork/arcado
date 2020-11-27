const { BaseModule } = require("lisk-sdk");

const CreateProjectAsset = require('./transactions/create-project');
const { getAllProjectsAsJson } = require('./utils/helpers');


class HallarModule extends BaseModule {
	name = "hallar";
	id = 2000;
	transactionAssets = [
		new CreateProjectAsset()
	]

	actions = {
		getAllProjects: async () => getAllProjectsAsJson(this._dataAccess),
	};
}

module.exports = HallarModule;
