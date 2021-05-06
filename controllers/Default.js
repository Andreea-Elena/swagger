'use strict';

var url = require('url');


var Default = require('../service/DefaultService');


module.exports.deleteNotesById = function deleteNotesById (req, res, next) {
  Default.deleteNotesById(req.swagger.params, res, next);
};

module.exports.getAllNotes = function getAllNotes (req, res, next) {
  Default.getAllNotes(req.swagger.params, res, next);
};

module.exports.getNotesById = function getNotesById (req, res, next) {
  Default.getNotesById(req.swagger.params, res, next);
};

module.exports.patchNotesById = function patchNotesById (req, res, next) {
  Default.patchNotesById(req.swagger.params, res, next);
};

module.exports.postNote = function postNote (req, res, next) {
  Default.postNote(req.swagger.params, res, next);
};

module.exports.putNotesById = function putNotesById (req, res, next) {
  Default.putNotesById(req.swagger.params, res, next);
};

module.exports.getCreateDatabase = function getCreateDatabase (req, res, next) {
  Default.getCreateDatabase(req, res, next)
}