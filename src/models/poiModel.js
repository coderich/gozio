'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;


const poiModel = new Schema({
	name: { type:String, required:true, index:{unique:true} },
	description: { type:String },
	images: [{name:String, position:Number}],
	// isComplete : { type:Boolean, default:false }
}, {
	timestamps: true
});


module.exports = Mongoose.model('POI', poiModel, 'pois');