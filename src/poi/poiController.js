const _ = require('underscore');
const POI = require('./poiModel');


// Main POI Object API
exports.list = (req, h) => {
    return POI.find({}).exec().then((pois) => {
        return pois;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
}
exports.get = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);
        return poi;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
}
exports.create = (req, h) => {
    return POI.create(req.payload).then((poi) => {
        return poi;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
}
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
}
exports.remove = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) return h.response('POI Not Found').code(404);
        return poi.remove();
    }).then((poi) => {
        return poi;
    }).catch((err) => {
        return h.response(err.toString()).code(500);
    });
}


// POI Image API
exports.createImage = (req, h) => {
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
        return poi.remove();
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
