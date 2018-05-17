'use strict';

const Mongoose = require('mongoose');
const MongoDBUrl = 'mongodb://localhost:27017/gozio_test';

beforeAll((done) => {
	Mongoose.connect(MongoDBUrl, {}).then(function() {
		Mongoose.connection.db.dropDatabase().then(function() {
			done();
		});
	});
});