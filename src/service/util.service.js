'use strict';

const FS = require('fs');
const Path = require('path');

const Api = {};
const uploadFolder = Path.join(__dirname, '..', '..', 'assets', 'uploads');

// TODO - Make this better
Api.uid = function() {
	return new Date().getTime();
};

Api.saveImage = function(file, name) {
	return new Promise((resolve, reject) => {
		var path = uploadFolder + '/' + name;
		var stream = FS.createWriteStream(path);

		// Handlers
        stream.on('error', (err) => { reject(err); });
        file.on('end', (err) => { resolve(); });

        file.pipe(stream);
	});
};

Api.removeImage = function(name) {
	return new Promise((resolve, reject) => {
		var path = uploadFolder + '/' + name;

		FS.unlink(path, (err) => {
			if (err) return reject(err);
			resolve();
		});
	});
};

Api.replaceImage = function(oldName, newFile, newName) {
	return Api.removeImage(oldName).then(function() {
		return Api.saveImage(newFile, newName);
	});
};

module.exports = Api;