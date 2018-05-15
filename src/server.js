'use strict';

const Hapi = require('hapi');
const Joi = require('joi');
const Mongoose = require('mongoose');
const POIController = require('./controllers/poiController');
const MongoDBUrl = 'mongodb://localhost:27017/gozio';

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
	method: 'GET',
	path: '/poi',
	handler: POIController.list
});
server.route({
    method: 'GET',
    path: '/poi/{id}',
    handler: POIController.get
});
server.route({
    method: 'POST',
    path: '/poi',
    handler: POIController.create
});
server.route({
    method: 'PUT',
    path: '/poi/{id}',
    handler: POIController.update
});
server.route({
    method: 'DELETE',
    path: '/poi/{id}',
    handler: POIController.remove
});

(async() => {
	try {
		await server.start();

		// Once started, connect to Mongo through Mongoose
		Mongoose.connect(MongoDBUrl, {}).then(() => { console.log(`Connected to Mongo server`) }, err => { console.log(err) });
		console.log(`Server running at: ${server.info.uri}`);
	} catch (err) {
		console.log(err)
	}
})();
