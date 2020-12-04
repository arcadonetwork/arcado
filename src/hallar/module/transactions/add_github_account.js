
const { BaseAsset } = require("lisk-sdk");

/**
 * Create new tournament with details
 */

const fee = "50000";

class AddGithubAccountAsset extends BaseAsset {
    name = "addGithubAccount";
    id = 1;
    schema = {
        $id: "hallar/addGithubAccount",
        type: "object",
        required: ["github"],
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
            }
        }
    };

    validate({asset}) {

        if (!asset.github.id || typeof asset.github.id !== 'number') {
            throw new Error(
              'Invalid "asset.id" defined'
            );
        }
        if (!asset.github.username || typeof asset.github.username !== 'string') {
            throw new Error(
              'Invalid "asset.username" defined'
            );
        }
    };

    async apply({ asset, stateStore, reducerHandler, transaction }) {
        const senderAddress = transaction.senderAddress;
        const senderAccount = await stateStore.account.get(senderAddress);

        if (senderAccount.hallar.github.id !== 0 && senderAccount.hallar.github.id !== asset.github.id) {
            throw new Error('You are trying to add a different account.');
        }

        // 6.update sender account with unique nft id
        senderAccount.hallar.github = asset.github;
        await stateStore.account.set(senderAddress, senderAccount);
    }

}

module.exports = AddGithubAccountAsset;
