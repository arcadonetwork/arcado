
const { BaseAsset } = require("lisk-sdk");
const { getAll, setAssets } = require("../utils/actions");
const { createProjectAssetSchema } = require("../schemas/project-schema");
const {PROJECT_CHAIN_STATE, PROJECT_CHAIN_SELECTOR} = require("../utils/helpers");

/**
 * Create new tournament with details
 */

class CreateProjectAsset extends BaseAsset {
    name = "createProject";
    id = 1;
    schema = createProjectAssetSchema;


    async apply({ asset, stateStore, reducerHandler, transaction }) {

        const senderAddress = transaction.senderAddress;

        const project = {
            id: asset.id,
            name: asset.name,
            createdBy: senderAddress
        }

        const projects = await getAll(stateStore, PROJECT_CHAIN_STATE, createProjectAssetSchema, PROJECT_CHAIN_SELECTOR);
        projects.push(project);
        await setAssets(stateStore, PROJECT_CHAIN_STATE, createProjectAssetSchema, projects);
    }

}

module.exports = CreateProjectAsset;
