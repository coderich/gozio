'use strict';

const FS = require('fs');
const UploadFolder = __dirname + '/../../assets/uploads';
const Api = {};

// TODO - Make this better
Api.uid = function() {
	return new Date().getTime();
};

Api.saveImage = function(file, name) {
	return new Promise((resolve, reject) => {
		const path = UploadFolder + '/' + name;
		const stream = FS.createWriteStream(path);

		// Handlers
        stream.on('error', (err) => { reject(err); });
        file.on('end', (err) => { resolve(); });

        file.pipe(stream);
	});
};

Api.removeImage = function(name) {
	return new Promise((resolve, reject) => {
		const path = UploadFolder + '/' + name;

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