const { codec } = require("lisk-sdk");

const getAll = async (stateStore, action, schema, selector) => {
	const registeredBuffer = await stateStore.chain.get(action);
	if (!registeredBuffer) {
		return [];
	}

	const decodedBuffer = codec.decode(
		schema,
		registeredBuffer
	);

	return decodedBuffer[selector];
};

const setAssets = async (stateStore, action, schema, assets) => {
	await stateStore.chain.set(
		action,
		codec.encode(schema, assets)
	);
};

module.exports = {
	getAll,
	setAssets
}
