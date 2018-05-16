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
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);
        _.extend(poi, req.payload);
        return poi.save();
    }).then((poi) => {
        return poi;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
}

exports.removeImage = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);

        var name = req.params.name;

        return UtilService.removeImage(name).then(function() {
            _.remove(poi.images, {name:name});
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
