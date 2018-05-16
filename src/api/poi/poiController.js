'use strict';

const _ = require('lodash');
const POI = require('./poiModel');
const UtilService = require('../../service/utilService');


// Main POI Object API
exports.list = (req, h) => {
    return POI.find({}).exec().then((pois) => {
        return pois;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
};

exports.get = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);
        return poi;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
};

exports.create = (req, h) => {
    return POI.create(req.payload).then((poi) => {
        return poi;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
};

exports.update = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);
        _.extend(poi, req.payload);
        return poi.save();
    }).then((poi) => {
        return poi;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
};

exports.remove = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);
        return poi.remove();
    }).then((poi) => {
        return poi;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
};


// POI Image API
exports.createImage = (req, h) => {
    var file = req.payload.file;
    if (!file) return h.response('Image File Missing').code(500);

    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);

        var filename = UtilService.uid();

        return UtilService.saveImage(file, filename).then(function() {
            poi.images.push({name:filename, position:poi.images.length});
            return poi.save();
        });
    }).then((poi) => {
        return poi;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
};

exports.updateImage = (req, h) => {
    var file = req.payload.file;
    if (!file) return h.response('Image File Missing').code(500);

    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);

        var oldImage = _.find(poi.images, {name:req.params.name});
        if (!oldImage) return h.response('POI Image Not Found').code(404);

        var newName = UtilService.uid();

        return UtilService.replaceImage(oldImage.name, file, newName).then(function() {
            oldImage.name = newName;
            poi.markModified('images');
            return poi.save();
        });
    }).then((poi) => {
        return poi;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
}

exports.removeImage = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);

        var oldImage = _.remove(poi.images, {name:req.params.name})[0];
        if (!oldImage) return h.response('POI Image Not Found').code(404);

        return UtilService.removeImage(oldImage.name).then(function() {
            // Reposition images
            poi.images.forEach(function(img) {
                if (img.position > oldImage.position) img.position--;
            });

            poi.markModified('images');
            return poi.save();
        });
    }).then((poi) => {
        return poi;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
}

//
exports.clean = (req, h) => {
    delete req.payload.isComplete;
    delete req.payload.images;
    return h.continue;
}
