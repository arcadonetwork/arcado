const routes = require('express').Router({ mergeParams: true });

class AccountRoutes {

	_channel;
	_codec;
	static getAll;

	constructor(channel, codec) {
		this._channel = channel;
		this._codec = codec;

		routes.get('/projects', this.getAllProjects.bind(this))
	}

	getAllProjects = async (req, res) => {
		const { address } = req.params;
		 let [projects, decodedAccount] = await Promise.all([
			 this._channel.invoke("hallar:projects"),
			 this._channel.invoke("app:getAccount", { address })
		 ])

		const account = this._codec.decodeAccount(decodedAccount);
		projects = projects.filter(project => account.hallar.projects.includes(project.id))

		 res.json({
			 data: projects
		 });
	}

	getRoutes = () => {
		return routes
	};

}

module.exports = AccountRoutes
