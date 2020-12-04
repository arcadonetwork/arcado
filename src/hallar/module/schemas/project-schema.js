

const projectSchema = {
	type: "object",
	required: ["id", "fullName"],
	properties: {
		id: {
			dataType: "uint32",
			fieldNumber: 1,
		},
		fullName: {
			dataType: "string",
			fieldNumber: 2,
		}
	}
}

const registeredProjectsSchema = {
	$id: "hallar/projects",
	type: "object",
	required: ["projects"],
	properties: {
		projects: {
			type: "array",
			fieldNumber: 1,
			items: {
				type: "object",
				required: ["id", "fullName"],
				properties: {
					id: {
						dataType: "uint32",
						fieldNumber: 1,
					},
					fullName: {
						dataType: "string",
						fieldNumber: 2,
					}
				},
			},
		},
	},
};

const addGithubProjectAssetSchema = {
	$id: "hallar/projects/add",
	...projectSchema
}


module.exports = {
	projectSchema,
	addGithubProjectAssetSchema,
	registeredProjectsSchema
}
