'use strict';

const Mongoose = require('mongoose');
const MongoDBUrl = 'mongodb://localhost:27017/gozio_test';

beforeAll((done) => {
	Mongoose.connect(MongoDBUrl, {}).then(() => done());
});

afterAll((done) => {
	Mongoose.connection.db.dropDatabase().then(() => done());
});