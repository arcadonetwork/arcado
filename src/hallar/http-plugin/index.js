const { Server } = require("http");
const express = require("express");
const cors = require("cors");
const { BasePlugin } = require("lisk-sdk");
const pJSON = require("../../../package.json");
const ExpressRoutes = require('./controllers');

class HallarHttpPlugin extends BasePlugin {
	_server = undefined;
	_app = undefined;
	_channel = undefined;

	static get alias() {
		return "HallarApi";
	}

	static get info() {
		return {
			author: pJSON.author,
			version: pJSON.version,
			name: pJSON.name,
		};
	}

	get defaults() {
		return {};
	}

	get events() {
		return [];
	}

	get actions() {
		return {};
	}

	async load(channel) {
		this._app = express();
		this._channel = channel;

		this._channel.once("app:ready", () => {
			this._app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT"] }));
			this._app.use(express.json());


			const routes = new ExpressRoutes(this._channel, this.codec);
			this._app.use('/api/projects', routes._projects);
			this._app.use('/api/accounts/:address', routes._accounts);


			this._server = this._app.listen(8090, "0.0.0.0");
		});
	}

	async unload() {
		await new Promise((resolve, reject) => {
			this._server.close((err) => {
				if (err) {
					reject(err);
					return;
				}
				resolve();
			});
		});
	}
}

module.exports = { HallarHttpPlugin };
