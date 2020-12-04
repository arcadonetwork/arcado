const routes = require('express').Router({ mergeParams: true });

class ProjectRoutes {

	_channel;
	_codec;
	static getAll;

	constructor(channel, codec) {
		this._channel = channel;
		this._codec = codec;

		routes.get('/', this.getAll.bind(this))
	}

	getAll = async (req, res) => {
		 const projects = await this._channel.invoke("hallar:projects");
		 res.json({ data: projects });
	}

	getRoutes = () => {
		return routes
	};

}

module.exports = ProjectRoutes
