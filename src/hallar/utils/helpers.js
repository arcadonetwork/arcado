const { codec } = require('lisk-sdk')
const { registeredProjectsSchema } = require("../module/schemas/project-schema");

const PROJECT_CHAIN_STATE = 'hallar:projects';
const PROJECT_CHAIN_SELECTOR = 'projects';

const getAllProjectsAsJson = async (dataAccess) => {
	const registeredTokensBuffer = await dataAccess.getChainState(PROJECT_CHAIN_STATE);

	if (!registeredTokensBuffer) {
		return [];
	}

	const allProjects = codec.decode(
		registeredProjectsSchema,
		registeredTokensBuffer
	);

	return codec.toJSON(registeredProjectsSchema, allProjects)[PROJECT_CHAIN_SELECTOR];
}

module.exports = {
	PROJECT_CHAIN_STATE,
	PROJECT_CHAIN_SELECTOR,
	getAllProjectsAsJson
};
