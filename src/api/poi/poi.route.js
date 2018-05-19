'use strict';

const POIController = require(__dirname + '/poi.controller');

module.exports = [
	// Main POI Object API
    { method:'GET', path:'/poi', handler:POIController.list },
    { method:'GET', path:'/poi/{id}', handler:POIController.get },
    { method:'POST', path:'/poi', config:{pre:[POIController.clean], handler:POIController.create} },
    { method:'PUT', path:'/poi/{id}', config:{pre:[POIController.clean], handler:POIController.update} },
    { method:'DELETE', path:'/poi/{id}', handler:POIController.remove },

    // POI Image API
    { method:'POST', path:'/poi/{id}/image', config:{payload:{output:'stream', allow:'multipart/form-data', maxBytes:1048576*10, parse:true}, handler:POIController.createImage} },
    { method:'PUT', path:'/poi/{id}/image/{name}', config:{payload:{output:'stream', allow:'multipart/form-data', maxBytes:1048576*10, parse:true}, handler:POIController.updateImage} },
    { method:'DELETE', path:'/poi/{id}/image/{name}', handler:POIController.removeImage },
    // { method:'PUT', path:'/poi/{id}/image/reposition', handler:POIController.repositionImage },
];