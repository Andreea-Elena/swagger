'use strict';
const Automobile = require('../models/Automobile');
var ObjectId = require('mongodb').ObjectId; 

exports.getAllAutomobiles = function(args, res, next) {
  Automobile.find({})
  .then(automobiles => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(automobiles));
  }, err => next(err))
  .catch(err => next(err));
}

exports.postAutomobile = function(args, res, next) {
  Automobile.create(args.automobile.value)
  .then(automobile => {
      console.log('Automobile Created ', automobile);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(automobile));
  }, err => next(err))
  .catch(err => next(err));
}

exports.getAutomobilesById = function(args, res, next) {
  if(args.id.value === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  Automobile.findById(args.id.value)
    .then(automobile => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(automobile));
    }, err => next(err))
    .catch(err => next(err)); 
}

exports.putAutomobilesById = function(args, res, next) {
  if(args.id.value === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  Automobile.findByIdAndUpdate(args.id.value,
    { $set: args.automobile.value }, 
    { new: true }
  )
  .then(automobile => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(automobile));
  }, err => next(err))
  .catch(err => next(err));
}


exports.patchAutomobilesById = function(args, res, next) {
  if(args.id.value === '') {
    res.statusCode = 500;
    res.end('ID Required');
 }
 Automobile.findByIdAndUpdate(args.id.value,
   { $set: args.automobile.value }, 
   { new: true }
 )
 .then(automobile => {
     res.statusCode = 200;
     res.setHeader('Content-Type', 'application/json');
     res.end(JSON.stringify(automobile));
 }, err => next(err))
 .catch(err => next(err));
}

exports.deleteAutomobilesById = function(args, res, next) {
  if(args.id.value === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  Automobile.findByIdAndRemove(args.id.value)
  .then(resp => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(resp));
  }, err => next(err))
  .catch(err => next(err));
}

