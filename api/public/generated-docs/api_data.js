define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/generated-docs/main.js",
    "group": "/Users/toanchung/SIT209/PRECISION-AHA-SIT209/api/public/generated-docs/main.js",
    "groupTitle": "/Users/toanchung/SIT209/PRECISION-AHA-SIT209/api/public/generated-docs/main.js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/api/chosen-devices",
    "title": "Add a device name to the array for later searching",
    "group": "CDevice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Device's name</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"Sucessfully added device and data\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n \"Device already exist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "CDevice",
    "name": "PostApiChosenDevices"
  },
  {
    "type": "get",
    "url": "/api/chosen-device",
    "title": "An array of chosen devices' name",
    "group": "Device",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n {\n   \"_id\": \"6168c67eda19306355ae9cef\",\n   \"name\": \"a\",\n   \"chosenDevice\": [\n     {\n       \"name\": \"f\"\n     },\n     {\n       \"name\": \"laptop\"\n     },\n     {\n      \"name\": \"ll\"\n     }\n   ],\n   \"__v\": 3\n }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Data does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Device",
    "name": "GetApiChosenDevice"
  },
  {
    "type": "get",
    "url": "/api/devices",
    "title": "An array of all devices",
    "group": "Device",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n {\n   \"_id\": \"614c9ea50ce45bd45a3e56be\",\n   \"name\": \"laptop\",\n   \"user\": \"hussain\",\n   \"sensorData\": [\n     {\n       \"ts\": 1632412759074,\n      \"loc\": {\n         \"lat\": \"-18.39522\",\n         \"lon\": \"-93.39309\"\n       },\n       \"temp\": 49\n     },\n     {\n       \"ts\": 1632412781149,\n       \"loc\": {\n         \"lat\": \"35.0871\",\n         \"lon\": \"-19.18277\"\n       },\n       \"temp\": 43\n     }\n   ],\n   \"__v\": 2\n }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Device does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Device",
    "name": "GetApiDevices"
  },
  {
    "type": "get",
    "url": "/api/devices/data",
    "title": "An array of all devices for later data displaying",
    "group": "Device",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n {\n   \"_id\": \"614c9ea50ce45bd45a3e56be\",\n   \"name\": \"laptop\",\n   \"user\": \"hussain\",\n   \"sensorData\": [\n     {\n       \"ts\": 1632412759074,\n      \"loc\": {\n         \"lat\": \"-18.39522\",\n         \"lon\": \"-93.39309\"\n       },\n       \"temp\": 49\n     },\n     {\n       \"ts\": 1632412781149,\n       \"loc\": {\n         \"lat\": \"35.0871\",\n         \"lon\": \"-19.18277\"\n       },\n       \"temp\": 43\n     }\n   ],\n   \"__v\": 2\n }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Device does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Device",
    "name": "GetApiDevicesData"
  },
  {
    "type": "post",
    "url": "/api/devices",
    "title": "Add a new device to the array",
    "group": "Device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Device's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "user",
            "description": "<p>User</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "sensorData",
            "description": "<p>Device's sensor data</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"Sucessfully added device and data\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n \"Device already exist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Device",
    "name": "PostApiDevices"
  }
] });
