'use strict';

const Hapi = require('hapi');
const Mongoose = require('mongoose');
const MongoDBUrl = 'mongodb://localhost:27017/gozio';

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
});

const routes = require('./src/api/poi/poi.route');
server.route(routes);

if (!module.parent) {
	(async() => {
		try {
			await server.start();
			Mongoose.connect(MongoDBUrl, {}).then(() => { console.log(`Connected to Mongo server`) }, err => { console.log(err) });
			console.log(`Server running at: ${server.info.uri}`);
		} catch (err) {
			console.log(err)
		}
	})();
}

module.exports = server;
