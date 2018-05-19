'use strict';

const _ = require('lodash');
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const UtilService = require(__dirname + '/../../service/util.service');

/**
 * @api {n/a} - POI Object Reference
 * @apiGroup POI
 * @apiName schema
 *
 * @apiSuccess {Number}     id              Unique ID of POI
 * @apiSuccess {String}     name            Name of the POI
 * @apiSuccess {String}     description     Description of the POI
 * @apiSuccess {Object[]}   images          List of POI Images
 * @apiSuccess {String}     images.name     Unique image name
 * @apiSuccess {Number}     images.position Position of the image for display
 * @apiSuccess {String}     images.uri      Fully qualified URI for image
 * @apiSuccess {Boolean}    isComplete      Flag to indicate if POI is complete (immutable)
 */
const schema = new Schema({
	name: { type:String, required:true, index:{unique:true} },
	description: { type:String },
	images: [{_id:false, name:String, position:Number, uri:String}],
	isComplete : { type:Boolean, default:false }
}, {
	timestamps: true,
});


// Middleware hooks
schema.pre('save', function(next) {
	// Ensure isComplete flag
	if (this.name && this.name.length && this.description && this.description.length && this.images && this.images.length)
		this.isComplete = true
	else
		this.isComplete = false;

	next();
});

schema.pre('remove', function(next) {
	this.removeAllImages().then(() => next());
});


// Methods
schema.methods.toJSON = function(opts) {
	this.images.forEach(function(image) {
		image.uri = 'http://localhost.com:3000/assets/uploads/' + image.name;
	});

	return this.toObject();
};

schema.methods.saveImage = function(image) {
	const filename = UtilService.uid();

    return UtilService.saveImage(image, filename).then(() => {
        this.images.push({name:filename, position:this.images.length});
        return this.save();
    });
};

schema.methods.updateImage = function(name, image) {
    const newName = UtilService.uid();
	const oldImage = _.find(this.images, {name:name});
	if (!oldImage) return Promise.reject('POI Image Not Found');

    return UtilService.replaceImage(oldImage.name, image, newName).then(() => {
        oldImage.name = newName;
        this.markModified('images');
        return this.save();
    });
};

schema.methods.removeImage = function(name) {
	const oldImage = _.remove(this.images, {name:name})[0];
	if (!oldImage) return Promise.reject('POI Image Not Found');

    return UtilService.removeImage(oldImage.name).then(() => {
        // Reposition images
        this.images.forEach(function(img) {
            if (img.position > oldImage.position) img.position--;
        });

        this.markModified('images');
        return this.save();
    });
};

schema.methods.removeAllImages = function() {
	return Promise.all(this.images.map(img => {
		return UtilService.removeImage(img.name);
	}));
};


module.exports = Mongoose.model('POI', schema, 'poi');
