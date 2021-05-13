'use strict';

var Default = require('../service/DefaultService');


module.exports.deleteAutomobilesById = function deleteAutomobilesById (req, res, next) {
  Default.deleteAutomobilesById(req.swagger.params, res, next);
};

module.exports.getAllAutomobiles = function getAllAutomobiles (req, res, next) {
  Default.getAllAutomobiles(req.swagger.params, res, next);
};

module.exports.getAutomobilesById = function getAutomobilesById (req, res, next) {
  Default.getAutomobilesById(req.swagger.params, res, next);
};

module.exports.patchAutomobilesById = function patchAutomobilesById (req, res, next) {
  Default.patchAutomobilesById(req.swagger.params, res, next);
};

module.exports.postAutomobile = function postAutomobile (req, res, next) {
  Default.postAutomobile(req.swagger.params, res, next);
};

module.exports.putAutomobilesById = function putAutomobilesById (req, res, next) {
  Default.putAutomobilesById(req.swagger.params, res, next);
};
