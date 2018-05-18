'use strict';

const Hapi = require('hapi');
const Mongoose = require('mongoose');
const MongoDBUrl = 'mongodb://localhost:27017/gozio';

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
});

// Routes
const routes = require('./src/api/poi/poi.route');

// Custom Error handling
// TODO - Better logging and/or transformation of error
const preResponse = function (request, h) {
    const response = request.response;

    // For now I just want to see 500 errors, we can log or do transformations here...
    if (response.isServer) {
    	console.error(response.message);
    }

    return h.continue;
};


//
server.route(routes);
server.ext('onPreResponse', preResponse);


// Start the server
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
