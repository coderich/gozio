'use strict';

const FS = require('fs');
const Path = require('path');
const AppDir = __dirname + '/../..';
const UploadFolder = AppDir + '/assets/uploads';
const UtilService = require(__dirname + '/util.service');

describe('Utility Service...', () => {
	test('Save Image...', () => {
		var file = FS.createReadStream(AppDir + '/assets/test/cafe.jpg');
		var target = UploadFolder + '/save-image-test.jpg';

	    return UtilService.saveImage(file, 'save-image-test.jpg').then(() => {
	    	expect(FS.existsSync(target)).toBe(true);
	    });
	});

	test('Replace Image...', () => {
		var file = FS.createReadStream(AppDir + '/assets/test/book.jpg');
		var oldTarget = UploadFolder + '/save-image-test.jpg';
		var newTarget = UploadFolder + '/update-image-test.jpg';

	    return UtilService.replaceImage('save-image-test.jpg', file, 'update-image-test.jpg').then(() => {
	    	expect(FS.existsSync(oldTarget)).toBe(false);
	    	expect(FS.existsSync(newTarget)).toBe(true);
	    });
	});

	test('Remove Image...', () => {
		var target = UploadFolder + '/update-image-test.jpg';

	    return UtilService.removeImage('update-image-test.jpg').then(() => {
	    	expect(FS.existsSync(target)).toBe(false);
	    });
	});
});
