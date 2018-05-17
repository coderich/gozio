'use strict';

const Server = require('../../../server.js');

describe('POI endpoints...', () => {
	test('POST New POI...', () => {
	    return Server.inject({method:'POST', url:'/poi', payload:{name:'Cafe', description:'Coffee', images:[{name:'image.jpg', position:0}], isComplete:true, data:'more'}}).then(response => {
	    	var result = response.result;
	    	expect(response.statusCode).toBe(201);	// Successful POST
	    	expect(result.isComplete).toBe(false);	// Should always be incomplete
	    	expect(result.images.length).toBe(0);	// Unable to directly modify images (by design)
	    	expect(result.data).toBeUndefined();	// Cannot POST ad-hoc attributes not defined in schema
	    });
	});

	test('POST Duplicate POI..', () => {
	    return Server.inject({method:'POST', url:'/poi', payload:{name:'Cafe', description:'Coffee', images:[{name:'image.jpg', position:0}], isComplete:true, data:'more'}}).then(response => {
	    	var result = response.result;
	    	expect(response.statusCode).toBe(500);
	    });
	});
});