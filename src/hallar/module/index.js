const { BaseModule } = require("lisk-sdk");

const AddGithubProjectsAsset = require('./transactions/add_github_project');
const AddGithubAccountAsset = require('./transactions/add_github_account');
const { getAllProjectsAsJson } = require('../utils/helpers');


class HallarModule extends BaseModule {
	name = "hallar";
	id = 18999;
	transactionAssets = [
		new AddGithubAccountAsset(),
		new AddGithubProjectsAsset()
	]

	accountSchema = {
		type: "object",
		required: ["github", "projects"],
		properties: {
			github: {
				type: "object",
				fieldNumber: 1,
				properties : {
					id: {
						dataType: "uint32",
						fieldNumber: 2,
					},
					username: {
						dataType: "string",
						fieldNumber: 3,
					}
				}
			},
			projects: {
				type: "array",
				fieldNumber: 4,
				items: {
					dataType: "uint32",
				},
			}
		},
		default: {
			github: {
				id: 0,
				username: ''
			},
			projects: []
		},
	};

	actions = {
		projects: async () => getAllProjectsAsJson(this._dataAccess)
	};
}

module.exports = { HallarModule };
