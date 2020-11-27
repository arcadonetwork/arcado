

const projectSchema = {
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

const createProjectAssetSchema = {
	$id: "arcado/game/create",
	...projectSchema
}


module.exports = {
	projectSchema,
	createProjectAssetSchema
}
