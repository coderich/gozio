'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;


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

// schema.post('init', function(poi) {
// 	poi.images.forEach(function(image) {
// 		image.uri = 'https://google.com';
// 	});
// });


module.exports = Mongoose.model('POI', schema, 'poi');
