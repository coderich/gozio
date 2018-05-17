'use strict';

const _ = require('lodash');
const FS = require('fs');
const Path = require('path');
const AppDir = Path.join(__dirname, '..', '..', '..');
const Server = require(Path.join(AppDir, 'server'));

const immutableData = {isComplete:true, images:[{name:'image.jpg', position:0}], nonsense:'to be ignored'};
const poi1Data = Object.assign({name:'Cafe', description:'Coffee'}, immutableData);
const poi2Data = Object.assign({name:'Bookstore', description:'Books'}, immutableData);
const poi3Data = Object.assign({name:'Gym', description:'Workout'}, immutableData);
const image1Data = Object.assign({file:FS.readFileSync(Path.join(AppDir, 'assets', 'test', 'cafe.jpg'))}, immutableData);
const image2Data = Object.assign({file:FS.readFileSync(Path.join(AppDir, 'assets', 'test', 'book.jpg'))}, immutableData);
const image3Data = Object.assign({file:FS.readFileSync(Path.join(AppDir, 'assets', 'test', 'gym.jpg'))}, immutableData);
var poi1Id, poi2Id, poi3Id;

describe('POI endpoints...', () => {
	test('GET All POIs...', () => {
	    return Server.inject({method:'GET', url:'/poi'}).then(response => {
	    	var result = response.result;
	    	expect(response.statusCode).toBe(200);	// Successful GET
	    	expect(result.length).toBe(0);			// We should have an empty array (no POIs)
	    });
	});

	test('Create New POI...', () => {
	    return Server.inject({method:'POST', url:'/poi', payload:poi1Data}).then(response => {
	    	var result = response.result;
	    	expect(response.statusCode).toBe(201);	// Successful POST
	    	expect(result.id).toBeDefined();		// Should have an id
	    	expect(result.isComplete).toBe(false);	// Should always be incomplete
	    	expect(result.images.length).toBe(0);	// Unable to directly modify images (by design)
	    	expect(result.nonsense).toBeUndefined();// Cannot create ad-hoc attributes not defined in schema
	    	poi1Id = result.id;
	    });
	});

	test('Create New POI...', () => {
	    return Server.inject({method:'POST', url:'/poi', payload:poi2Data}).then(response => {
	    	var result = response.result;
	    	expect(response.statusCode).toBe(201);	// Successful POST
	    	expect(result.id).toBeDefined();		// Should have an id
	    	expect(result.isComplete).toBe(false);	// Should always be incomplete
	    	expect(result.images.length).toBe(0);	// Unable to directly modify images (by design)
	    	expect(result.nonsense).toBeUndefined();// Cannot create ad-hoc attributes not defined in schema
	    	poi2Id = result.id;
	    });
	});

	test('Create New POI...', () => {
	    return Server.inject({method:'POST', url:'/poi', payload:poi3Data}).then(response => {
	    	var result = response.result;
	    	expect(response.statusCode).toBe(201);	// Successful POST
	    	expect(result.id).toBeDefined();		// Should have an id
	    	expect(result.isComplete).toBe(false);	// Should always be incomplete
	    	expect(result.images.length).toBe(0);	// Unable to directly modify images (by design)
	    	expect(result.nonsense).toBeUndefined();// Cannot create ad-hoc attributes not defined in schema
	    	poi3Id = result.id;
	    });
	});

	test('Create Duplicate POI..', () => {
	    return Server.inject({method:'POST', url:'/poi', payload:poi1Data}).then(response => {
	    	var result = response.result;
	    	expect(response.statusCode).toBe(500);
	    });
	});

	test('Update Existing POI...', () => {
		var poi = Object.assign({name:'Cafeteria'}, immutableData);

	    return Server.inject({method:'PUT', url:'/poi/' + poi1Id, payload:poi}).then(response => {
	    	var result = response.result;
	    	expect(response.statusCode).toBe(201);	// Successful PUT
	    	expect(result.name).toBe('Cafeteria');	// Successful update
	    	expect(result.isComplete).toBe(false);	// Should still be incomplete
	    	expect(result.images.length).toBe(0);	// Should still have no images
	    	expect(result.nonsense).toBeUndefined();// Cannot create ad-hoc attributes not defined in schema
	    });
	});

	test('Add New POI1 Image...', () => {
	    return Server.inject({method:'POST', url:'/poi/' + poi1Id + '/image', payload:image1Data}).then(response => {
	    	var result = response.result;
	    	console.log(result);
	    });
	});
});