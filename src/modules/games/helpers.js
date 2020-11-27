const { codec } = require("lisk-sdk");
const { gameSchema } = require('../../utils/constants')
const gamesSchema = {
	$id: "arcado/games",
	type: "object",
	required: ["games"],
	properties: {
		games: {
			type: "array",
			fieldNumber: 1,
			items: gameSchema
		},
	},
};

const CHAIN_STATE_GAMES = "arcado:games";

const getAllGames = async (stateStore) => {
	const registeredGamesBuffer = await stateStore.chain.get(CHAIN_STATE_GAMES);
	if (!registeredGamesBuffer) {
		return [];
	}

	const decodedGames = codec.decode(
		gamesSchema,
		registeredGamesBuffer
	);

	return decodedGames.games;
};

const setGames = async (stateStore, games) => {
	console.log(games);
	const sortedGames = {
		games: games.sort((a, b) => a.id.compare(b.id)),
	};

	await stateStore.chain.set(
		CHAIN_STATE_GAMES,
		codec.encode(gamesSchema, sortedGames)
	);
};

const getAllAsJson = async (dataAccess) => {
	const registeredTokensBuffer = await dataAccess.getChainState(
		CHAIN_STATE_GAMES
	);

	if (!registeredTokensBuffer) {
		return [];
	}

	const allGames = codec.decode(
		gamesSchema,
		registeredTokensBuffer
	);

	return codec.toJSON(gamesSchema, allGames).games;
}


module.exports = {
	gamesSchema,
	CHAIN_STATE_GAMES,
	getAllGames,
	setGames,
	getAllAsJson
};
