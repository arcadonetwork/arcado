const gameSchema = {
	type: "object",
	required: ["id", "name", "description", "createdBy"],
	properties: {
		id: {
			dataType: "string",
			fieldNumber: 1,
		},
		name: {
			dataType: "string",
			fieldNumber: 2,
		},
		description: {
			dataType: "string",
			fieldNumber: 3,
		},
		createdBy: {
			dataType: "string",
			fieldNumber: 4,
		}
	}
}

/*export const FEES = {
	createGame: '25'
};

export const TRANSACTION_TYPES = {
	GAMES: 31,
	TOURNAMENTS: 30,
	JOIN_TOURNAMENT: 31,
	START_TOURNAMENT: 32,
	STOP_TOURNAMENT: 33,
}

export const NETWORK = {
	GENESIS: '11237980039345381032L'
}*/


/*export const FEES = {
	createGame: '25'
};

export const TRANSACTION_TYPES = {
	GAMES: 30,
	TOURNAMENTS: 31,
	JOIN_TOURNAMENT: 32,
	START_TOURNAMENT: 33,
	STOP_TOURNAMENT: 34,
}

export const NETWORK = {
	GENESIS: '11237980039345381032L'
}*/

const createGameAssetSchema = {
	$id: "arcado/game/create",
	...gameSchema
}



module.exports = {
	createGameAssetSchema,
	gameSchema
};
