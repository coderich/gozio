'use strict';

const POI = require('./poi.model');
const UtilService = require('../../service/util.service');


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
        return h.response(poi).code(201);
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
};

exports.update = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);

        Object.keys(req.payload).forEach((key) => {
            poi.set(key, req.payload[key]);
        });

        return poi.save();
    }).then((poi) => {
        return h.response(poi).code(201);
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
};

exports.remove = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);
        return poi.remove();
    }).then((poi) => {
        return h.response(poi).code(204);
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
};


// POI Image API
exports.createImage = (req, h) => {
    var image = req.payload.image;
    if (!image) return h.response('Image Missing').code(400);

    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);
        return poi.saveImage(image);
    }).then((poi) => {
        return poi;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
};

exports.updateImage = (req, h) => {
    var image = req.payload.image;
    if (!image) return h.response('Image Missing').code(400);

    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);
        return poi.updateImage(req.params.name, image);
    }).then((poi) => {
        return poi;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
}

exports.removeImage = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);
        return poi.removeImage(req.params.name);
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
