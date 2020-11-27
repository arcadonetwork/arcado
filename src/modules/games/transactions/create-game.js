const { BaseAsset } = require("lisk-sdk");
const { getAllGames, setGames } = require("../helpers");
const { createGameAssetSchema } = require("../../../utils/constants");

/**
 * Create new tournament with details
 */

class CreateGameAsset extends BaseAsset {
    name = "createGame";
    id = 1;
    schema = createGameAssetSchema;


    async apply({ asset, stateStore, reducerHandler, transaction }) {

        const senderAddress = transaction.senderAddress;
        console.log(createGameAssetSchema)
        const game = {
            id: asset.id,
            name: asset.name,
            description: asset.description,
            createdBy: senderAddress
        }

        const games = await getAllGames(stateStore);
        games.push(game);
        await setGames(stateStore, games);
    }

}

module.exports = CreateGameAsset;
