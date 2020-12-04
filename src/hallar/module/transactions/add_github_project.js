
const { BaseAsset } = require("lisk-sdk");
const { getAll, setAssets } = require("../../utils/actions");
const { addGithubProjectAssetSchema, registeredProjectsSchema } = require("../schemas/project-schema");
const {PROJECT_CHAIN_STATE, PROJECT_CHAIN_SELECTOR} = require("../../utils/helpers");

/**
 * Add Github Projects
*/

class AddGithubProjectsAsset extends BaseAsset {
    name = "addGithubProject";
    id = 2;
    schema = addGithubProjectAssetSchema;


    async apply({ asset, stateStore, reducerHandler, transaction }) {

        const senderAddress = transaction.senderAddress;
        const senderAccount = await stateStore.account.get(senderAddress);

        const project = {
            id : asset.id,
            fullName: asset.fullName
        }

        senderAccount.hallar.projects.push(asset.id);
        await stateStore.account.set(senderAddress, senderAccount);

        const projects = await getAll(stateStore, PROJECT_CHAIN_STATE, registeredProjectsSchema, PROJECT_CHAIN_SELECTOR);
        projects.push(project);
        await setAssets(stateStore, PROJECT_CHAIN_STATE, registeredProjectsSchema, { projects });
    }

}

module.exports = AddGithubProjectsAsset;
