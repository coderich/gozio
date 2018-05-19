'use strict';

const Mongoose = require('mongoose');
const MongoDBUrl = 'mongodb://localhost:27017/gozio_test';
const POI = require(__dirname + '/src/api/poi/poi.model');

beforeAll((done) => {
	Mongoose.connect(MongoDBUrl, {}).then(() => done());
});

afterAll((done) => {
	POI.find({}).then(pois => {
		Promise.all(pois.map(poi => {
			return poi.remove();
		})).then(() => done());
	});
});
