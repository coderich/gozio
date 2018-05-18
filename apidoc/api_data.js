define({ "api": [  {    "type": "post",    "url": "/poi",    "title": "Create",    "group": "POI",    "name": "create",    "description": "<p>Create an individual POI. Returns the created POI.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>Name of POI (unique)</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "description",            "description": "<p>Description of POI</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/api/poi/poi.controller.js",    "groupTitle": "POI"  },  {    "type": "post",    "url": "/poi/:id/image",    "title": "Create Image",    "group": "POI",    "name": "create_image",    "description": "<p>Upload a new POI image. Returns the updated POI.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>POI ID</p>"          },          {            "group": "Parameter",            "type": "File",            "optional": false,            "field": "image",            "description": "<p>The image file for upload</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/api/poi/poi.controller.js",    "groupTitle": "POI"  },  {    "type": "get",    "url": "/poi/:id",    "title": "Get",    "group": "POI",    "name": "get",    "description": "<p>Retreive an individual POI by id.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>POI ID</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/api/poi/poi.controller.js",    "groupTitle": "POI"  },  {    "type": "get",    "url": "/poi",    "title": "List",    "group": "POI",    "name": "list",    "description": "<p>List all available POIs. Returns an array of POIs.</p>",    "version": "0.0.0",    "filename": "src/api/poi/poi.controller.js",    "groupTitle": "POI"  },  {    "type": "delete",    "url": "/poi/:id",    "title": "Remove",    "group": "POI",    "name": "remove",    "description": "<p>Remove an individual POI. Returns no content.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>POI ID</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/api/poi/poi.controller.js",    "groupTitle": "POI"  },  {    "type": "delete",    "url": "/poi/:id/image/:name",    "title": "Remove Image",    "name": "remove_image",    "description": "<p>Remove an existing POI image. Returns the updated POI.</p>",    "group": "POI",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>POI ID</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>POI Image Name</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/api/poi/poi.controller.js",    "groupTitle": "POI"  },  {    "type": "n/a",    "url": "-",    "title": "POI Object Reference",    "group": "POI",    "name": "schema",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Unique ID of POI</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>Name of the POI</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>Description of the POI</p>"          },          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "images",            "description": "<p>List of POI Images</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "images.name",            "description": "<p>Unique image name</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "images.position",            "description": "<p>Position of the image for display</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "images.uri",            "description": "<p>Fully qualified URI for image</p>"          },          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "isComplete",            "description": "<p>Flag to indicate if POI is complete (immutable)</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/api/poi/poi.model.js",    "groupTitle": "POI"  },  {    "type": "put",    "url": "/poi/:id",    "title": "Update",    "group": "POI",    "name": "update",    "description": "<p>Update an individual POI. Returns the updated POI.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>POI ID</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "name",            "description": "<p>Name of POI</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "description",            "description": "<p>Description of POI</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/api/poi/poi.controller.js",    "groupTitle": "POI"  },  {    "type": "put",    "url": "/poi/:id/image/:name",    "title": "Update Image",    "group": "POI",    "name": "update_image",    "description": "<p>Update an existing POI image. Returns the updated POI.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>POI ID</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>POI Image Name</p>"          },          {            "group": "Parameter",            "type": "File",            "optional": false,            "field": "image",            "description": "<p>The image file for upload</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/api/poi/poi.controller.js",    "groupTitle": "POI"  }] });
