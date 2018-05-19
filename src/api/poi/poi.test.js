'use strict';

const FS = require('fs');
const Path = require('path');
const FormData = require('form-data');
const StreamToPromise = require('stream-to-promise');
const AppDir = __dirname + '/../../..';
const Server = require(AppDir + '/server');

const immutableData = {isComplete:true, images:[{name:'image.jpg', position:0}], nonsense:'to be ignored'};
const poi1Data = Object.assign({name:'Cafe', description:'Coffee'}, immutableData);
const poi2Data = Object.assign({name:'Bookstore', description:'Books'}, immutableData);
const poi3Data = Object.assign({name:'Gym', description:'Workout'}, immutableData);

var poi1Id, poi2Id, poi3Id;
var image1Name, image2Name, image3Name;

describe('POI API...', () => {
	test('GET All POIs...', () => {
	    return Server.inject({method:'GET', url:'/poi'}).then(response => {
	    	const result = response.result;
	    	expect(response.statusCode).toBe(200);		// Successful GET
	    	expect(result.length).toBe(0);				// We should have an empty array (no POIs)
	    });
	});

	test('GET Non-Existant POI...', () => {
	    return Server.inject({method:'GET', url:'/poi/5aff0883b5764547de9a6aee'}).then(response => {
	    	const result = response.result;
	    	expect(response.statusCode).toBe(404);		// POI Not Found
	    });
	});

	test('Create New POI...', () => {
	    return Server.inject({method:'POST', url:'/poi', payload:poi1Data}).then(response => {
	    	const result = response.result;
	    	expect(response.statusCode).toBe(201);		// Successful POST
	    	expect(result.id).toBeDefined();			// Should have an id
	    	expect(result.isComplete).toBe(false);		// Should be incomplete
	    	expect(result.images.length).toBe(0);		// Unable to directly modify images (by design)
	    	expect(result.nonsense).toBeUndefined();	// Cannot create ad-hoc attributes not defined in schema
	    	poi1Id = result.id;
	    });
	});

	test('Create Another POI...', () => {
	    return Server.inject({method:'POST', url:'/poi', payload:poi2Data}).then(response => {
	    	const result = response.result;
	    	expect(response.statusCode).toBe(201);		// Successful POST
	    	expect(result.id).toBeDefined();			// Should have an id
	    	expect(result.isComplete).toBe(false);		// Should be incomplete
	    	expect(result.images.length).toBe(0);		// Unable to directly modify images (by design)
	    	expect(result.nonsense).toBeUndefined();	// Cannot create ad-hoc attributes not defined in schema
	    	poi2Id = result.id;
	    });
	});

	test('Create Another POI...', () => {
	    return Server.inject({method:'POST', url:'/poi', payload:poi3Data}).then(response => {
	    	const result = response.result;
	    	expect(response.statusCode).toBe(201);		// Successful POST
	    	expect(result.id).toBeDefined();			// Should have an id
	    	expect(result.isComplete).toBe(false);		// Should be incomplete
	    	expect(result.images.length).toBe(0);		// Unable to directly modify images (by design)
	    	expect(result.nonsense).toBeUndefined();	// Cannot create ad-hoc attributes not defined in schema
	    	poi3Id = result.id;
	    });
	});

	test('Create Duplicate POI..', () => {
	    return Server.inject({method:'POST', url:'/poi', payload:poi1Data}).then(response => {
	    	const result = response.result;
	    	expect(response.statusCode).toBe(500);		// TODO - perhaps this should be something else
	    });
	});

	test('Update Existing POI...', () => {
		const poi = Object.assign({name:'Cafeteria'}, immutableData);

	    return Server.inject({method:'PUT', url:'/poi/' + poi1Id, payload:poi}).then(response => {
	    	const result = response.result;
	    	expect(response.statusCode).toBe(201);		// Successful PUT
	    	expect(result.name).toBe('Cafeteria');		// Successful update
	    	expect(result.isComplete).toBe(false);		// Should still be incomplete
	    	expect(result.images.length).toBe(0);		// Should still have no images
	    	expect(result.nonsense).toBeUndefined();	// Cannot create ad-hoc attributes not defined in schema
	    });
	});

	test('Add 1st Image...', () => {
		const image1Data = new FormData(); image1Data.append('image', FS.createReadStream(Path.join(AppDir, 'assets', 'test', 'cafe.jpg')));

		return StreamToPromise(image1Data).then(function(payload) {
		    return Server.inject({method:'POST', url:'/poi/' + poi1Id + '/image', payload:payload, headers:image1Data.getHeaders()}).then(response => {
		    	const result = response.result; image1Name = result.images[0].name;
		    	expect(response.statusCode).toBe(200);		// Success
		    	expect(result.isComplete).toBe(true);		// Should now be complete!
		    	expect(result.images.length).toBe(1);		// Should have 1 image
		    	expect(result.images[0].position).toBe(0);	// Should be position 0
		    	expect(result.images[0].uri).toBeDefined();	// Should have a URI
		    });
		});
	});

	test('Add 2nd Image...', () => {
		const image2Data = new FormData(); image2Data.append('image', FS.createReadStream(Path.join(AppDir, 'assets', 'test', 'book.jpg')));

		return StreamToPromise(image2Data).then(function(payload) {
		    return Server.inject({method:'POST', url:'/poi/' + poi1Id + '/image', payload:payload, headers:image2Data.getHeaders()}).then(response => {
		    	const result = response.result; image2Name = result.images[1].name;
		    	expect(response.statusCode).toBe(200);		// Success
		    	expect(result.isComplete).toBe(true);		// Should still be complete
		    	expect(result.images.length).toBe(2);		// Should have 2 images
		    	expect(result.images[0].position).toBe(0);	// Should be position 0
		    	expect(result.images[1].position).toBe(1);	// Should be position 1
		    	expect(result.images[1].uri).toBeDefined();	// Should have a URI
		    });
		});
	});

	test('Add 3rd Image...', () => {
		const image3Data = new FormData(); image3Data.append('image', FS.createReadStream(Path.join(AppDir, 'assets', 'test', 'gym.jpg')));

		return StreamToPromise(image3Data).then(function(payload) {
		    return Server.inject({method:'POST', url:'/poi/' + poi1Id + '/image', payload:payload, headers:image3Data.getHeaders()}).then(response => {
		    	const result = response.result; image3Name = result.images[2].name;
		    	expect(response.statusCode).toBe(200);		// Success
		    	expect(result.isComplete).toBe(true);		// Should still be complete
		    	expect(result.images.length).toBe(3);		// Should have 3 images
		    	expect(result.images[0].position).toBe(0);	// Should be position 0
		    	expect(result.images[1].position).toBe(1);	// Should be position 1
		    	expect(result.images[2].position).toBe(2);	// Should be position 2
		    	expect(result.images[2].uri).toBeDefined();	// Should have a URI
		    });
		});
	});

	test('Replace 3rd Image...', () => {
		const image1Data = new FormData(); image1Data.append('image', FS.createReadStream(Path.join(AppDir, 'assets', 'test', 'cafe.jpg')));

		return StreamToPromise(image1Data).then(function(payload) {
		    return Server.inject({method:'PUT', url:'/poi/' + poi1Id + '/image/' + image3Name, payload:payload, headers:image1Data.getHeaders()}).then(response => {
		    	const result = response.result;
		    	expect(response.statusCode).toBe(200);					// Success
		    	expect(result.isComplete).toBe(true);					// Should still be complete
		    	expect(result.images.length).toBe(3);					// Should still have 3 images
		    	expect(result.images[0].position).toBe(0);				// Should be position 0
		    	expect(result.images[1].position).toBe(1);				// Should be position 1
		    	expect(result.images[2].position).toBe(2);				// Should be position 2
		    	expect(result.images[2].name).not.toEqual(image3Name);	// Should be a new name
		    	image3Name = result.images[2].name;
		    });
		});
	});

	test('Delete Image2 (middle position)...', () => {
	    return Server.inject({method:'DELETE', url:'/poi/' + poi1Id + '/image/' + image2Name}).then(response => {
	    	const result = response.result;
	    	expect(response.statusCode).toBe(200);		// Success
	    	expect(result.isComplete).toBe(true);		// Should still be complete
	    	expect(result.images.length).toBe(2);		// Should have 2 images
	    	expect(result.images[0].position).toBe(0);	// Should be position 0
	    	expect(result.images[1].position).toBe(1);	// Should be position 1 (re-ordered)
	    });
	});

	test('Delete Image1...', () => {
	    return Server.inject({method:'DELETE', url:'/poi/' + poi1Id + '/image/' + image1Name}).then(response => {
	    	const result = response.result;
	    	expect(response.statusCode).toBe(200);		// Success
	    	expect(result.isComplete).toBe(true);		// Should still be complete
	    	expect(result.images.length).toBe(1);		// Should have 1 image
	    });
	});

	test('Delete Image3...', () => {
	    return Server.inject({method:'DELETE', url:'/poi/' + poi1Id + '/image/' + image3Name}).then(response => {
	    	const result = response.result;
	    	expect(response.statusCode).toBe(200);		// Success
	    	expect(result.isComplete).toBe(false);		// Should be back to incomplete!
	    	expect(result.images.length).toBe(0);		// Should have no images
	    });
	});

	test('Delete POI...', () => {
	    return Server.inject({method:'DELETE', url:'/poi/' + poi1Id}).then(response => {
	    	const result = response.result;
	    	expect(response.statusCode).toBe(204);		// Success
	    });
	});

	test('GET All POIs...', () => {
	    return Server.inject({method:'GET', url:'/poi'}).then(response => {
	    	const result = response.result;
	    	expect(response.statusCode).toBe(200);	// Successful GET
	    	expect(result.length).toBe(2);			// We should now have 2 POIs
	    });
	});
});
