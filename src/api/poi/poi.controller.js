'use strict';

const Boom = require('boom');
const POI = require(__dirname + '/poi.model');

/**
 * @api {get} /poi List
 * @apiGroup POI
 * @apiName list
 * @apiDescription List all available POIs. Returns an array of POIs.
 */
exports.list = (req, h) => {
    return POI.find({}).exec().then((pois) => {
        return pois;
    });
};

/**
 * @api {get} /poi/:id Get
 * @apiGroup POI
 * @apiName get
 * @apiDescription Retreive an individual POI by id.
 *
 * @apiParam {Number}   id  POI ID
 */
exports.get = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) throw Boom.notFound('POI Not Found');
        return poi;
    });
};

/**
 * @api {post} /poi Create
 * @apiGroup POI
 * @apiName create
 * @apiDescription Create an individual POI. Returns the created POI.
 *
 * @apiParam {String}   name            Name of POI (unique)
 * @apiParam {String}   [description]   Description of POI
 */
exports.create = (req, h) => {
    return POI.create(req.payload).then((poi) => {
        return h.response(poi).code(201);
    });
};

/**
 * @api {put} /poi/:id Update
 * @apiGroup POI
 * @apiName update
 * @apiDescription Update an individual POI. Returns the updated POI.
 *
 * @apiParam {Number}   id              POI ID
 * @apiParam {String}   [name]          Name of POI
 * @apiParam {String}   [description]   Description of POI
 */
exports.update = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) throw Boom.notFound('POI Not Found');

        // Assign keys from payload to POI
        Object.keys(req.payload).forEach((key) => {
            poi.set(key, req.payload[key]);
        });

        return poi.save();
    }).then((poi) => {
        return h.response(poi).code(201);
    });
};

/**
 * @api {delete} /poi/:id Remove
 * @apiGroup POI
 * @apiName remove
 * @apiDescription Remove an individual POI. Returns no content.
 *
 * @apiParam {Number}   id  POI ID
 */
exports.remove = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) throw Boom.notFound('POI Not Found');
        return poi.remove();
    }).then((poi) => {
        return h.response(poi).code(204);
    });
};


/**
 * @api {post} /poi/:id/image Create Image
 * @apiGroup POI
 * @apiName create-image
 * @apiDescription Upload a new POI image. Returns the updated POI.
 *
 * @apiParam {Number}   id      POI ID
 * @apiParam {File}     image   The image file for upload
 */
exports.createImage = (req, h) => {
    const image = req.payload.image;
    if (!image) throw Boom.badRequest('Image Missing');

    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) throw Boom.notFound('POI Not Found');
        return poi.saveImage(image);
    });
};

/**
 * @api {put} /poi/:id/image/:name Update Image
 * @apiGroup POI
 * @apiName update-image
 * @apiDescription Update an existing POI image. Returns the updated POI.
 *
 * @apiParam {Number}   id      POI ID
 * @apiParam {String}   name    POI Image Name
 * @apiParam {File}     image   The image file for upload
 */
exports.updateImage = (req, h) => {
    const image = req.payload.image;
    if (!image) throw Boom.badRequest('Image Missing');

    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) throw Boom.notFound('POI Not Found');
        return poi.updateImage(req.params.name, image);
    });
};

/**
 * @api {delete} /poi/:id/image/:name Remove Image
 * @apiName remove-image
 * @apiDescription Remove an existing POI image. Returns the updated POI.
 * @apiGroup POI
 *
 * @apiParam {Number}   id      POI ID
 * @apiParam {String}   name    POI Image Name
 */
exports.removeImage = (req, h) => {
    return POI.findById(req.params.id).exec().then((poi) => {
        if (!poi) throw Boom.notFound('POI Not Found');
        return poi.removeImage(req.params.name);
    });
};

// TODO - not sure I like this here
exports.clean = (req, h) => {
    req.payload = req.payload || {};
    delete req.payload.isComplete;
    delete req.payload.images;
    return h.continue;
};
