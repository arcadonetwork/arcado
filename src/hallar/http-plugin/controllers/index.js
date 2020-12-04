const ProjectRoutes = require('./projects');
const AccountRoutes = require('./accounts');

class ExpressRoutes {

	_channel;
	_codec;
	_projects;
	_accounts;

	constructor(channel, codec) {
		this._channel = channel;
		this._codec = codec;

		const projectRoutes = new ProjectRoutes(this._channel, this._codec)
		this._projects = projectRoutes.getRoutes();

		const accountRoutes = new AccountRoutes(this._channel, this._codec);
		this._accounts = accountRoutes.getRoutes();
	}

}

module.exports = ExpressRoutes
