const { codec } = require('lisk-sdk')
const { projectSchema } = require("../schemas/project-schema");

const PROJECT_CHAIN_STATE = 'hallar:projects';
const PROJECT_CHAIN_SELECTOR = 'projects';

const CONTRIBUTION_CHAIN_STATE = 'hallar:contributions';

const getAllProjectsAsJson = async (dataAccess) => {
	const registeredTokensBuffer = await dataAccess.getChainState(
		PROJECT_CHAIN_STATE
	);

	if (!registeredTokensBuffer) {
		return [];
	}

	const allProjects = codec.decode(
		projectSchema,
		registeredTokensBuffer
	);

	return codec.toJSON(projectSchema, allProjects)[PROJECT_CHAIN_SELECTOR];
}

module.exports = {
	PROJECT_CHAIN_STATE,
	PROJECT_CHAIN_SELECTOR,
	CONTRIBUTION_CHAIN_STATE,
	getAllProjectsAsJson
};
