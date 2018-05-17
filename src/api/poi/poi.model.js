'use strict';

const _ = require('lodash');
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const UtilService = require('../../service/util.service');


const schema = new Schema({
	name: { type:String, required:true, index:{unique:true} },
	description: { type:String },
	images: [{_id:false, name:String, position:Number, uri:String}],
	isComplete : { type:Boolean, default:false }
}, {
	timestamps: true
});

schema.pre('save', function(next) {
	// Ensure isComplete flag
	if (this.name && this.name.length && this.description && this.description.length && this.images && this.images.length)
		this.isComplete = true
	else
		this.isComplete = false;

	next();
});

// Methods
schema.methods.saveImage = function(image) {
	var filename = UtilService.uid();

    return UtilService.saveImage(image, filename).then(() => {
        this.images.push({name:filename, position:this.images.length});
        return this.save();
    });
};

schema.methods.updateImage = function(name, image) {
    var newName = UtilService.uid();
	var oldImage = _.find(this.images, {name:name});
	if (!oldImage) return Promise.reject('POI Image Not Found');
    // if (!oldImage) return h.response('POI Image Not Found').code(404);

    return UtilService.replaceImage(oldImage.name, image, newName).then(() => {
        oldImage.name = newName;
        this.markModified('images');
        return this.save();
    });
};

schema.methods.removeImage = function(name) {
	var oldImage = _.remove(this.images, {name:name})[0];
	if (!oldImage) return Promise.reject('POI Image Not Found');
    // if (!oldImage) return h.response('POI Image Not Found').code(404);

    return UtilService.removeImage(oldImage.name).then(() => {
        // Reposition images
        this.images.forEach(function(img) {
            if (img.position > oldImage.position) img.position--;
        });

        this.markModified('images');
        return this.save();
    });
};

// schema.post('init', function(poi) {
// 	poi.images.forEach(function(image) {
// 		image.uri = 'https://google.com';
// 	});
// });


module.exports = Mongoose.model('POI', schema, 'poi');
