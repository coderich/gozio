const POIController = require('./poiController');

module.exports = [
	// Main POI Object API
    { method:'GET', path:'/poi', handler:POIController.list },
    { method:'GET', path:'/poi/{id}', handler:POIController.get },
    { method:'POST', path:'/poi', config: { pre:[POIController.clean], handler:POIController.create } },
    { method:'PUT', path:'/poi/{id}', config: { pre:[POIController.clean], handler:POIController.update } },
    { method:'DELETE', path:'/poi/{id}', handler:POIController.remove },

    // POI Image API
    { method:'POST', path:'/poi/{id}/image', handler:POIController.createImage },
    { method:'PUT', path:'/poi/{id}/image/{id}', handler:POIController.updateImage },
    // { method:'PUT', path:'/poi/{id}/image/reposition', handler:POIController.repositionImage },
    { method:'DELETE', path:'/poi/{id}/image/{id}', handler:POIController.removeImage },
];