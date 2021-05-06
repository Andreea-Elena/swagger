'use strict';
var low	= require('lowdb');
const db = low('db.json');

var mongo = require('mongodb');

exports.getAllNotes = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(db.get('notes').value()));
}

function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}

exports.postNote = function(args, res, next) {
  /**
   * parameters expected in the args:
  * note (Note)
  **/
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;


  var result = db.get('notes')
	  .push({ id: uuid(), text: args.note.value.text })
	  .value()
    db.set(result).write()
    res.end(JSON.stringify(result));

}

exports.getNotesById = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (String)
  * note (Note)
  **/
  if(args.id.value === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(db.get('notes').find({ id: args.id.value }).value()));
}

exports.putNotesById = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (String)
  * note (Note)
  **/
  if(args.id.value === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;
  var result = db.get('notes')
  	.find({ id: args.id.value })
	  .assign({ text: args.note.value.text})
	  .value()
  db.set(result).write()
  res.end(JSON.stringify(result));
}


exports.patchNotesById = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (String)
  * note (Note)
  **/
  if(args.id.value === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;

  var result = db.get('notes')
  	.find({ id: args.id.value })
	  .assign({ text: args.note.value.text })
	  .value()
  db.set(result).write()
  res.end(JSON.stringify(result));
}

exports.deleteNotesById = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (String)
  * note (Note)
  **/
  if(args.id.value === '') {
  	 res.statusCode = 500;
  	 res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 204;
  db.get('notes')
	  .remove({ id: args.id.value })
	  .value()
  db.find({ id: args.id.value }).remove().write()
  res.end();
}

exports.getCreateDatabase = function(req, res, next) {
  /**
   * parameters expected in the args:
  * id (String)
  * note (Note)
  **/
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 204;
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://0.0.0.0:27017/notes";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close(); 
  });
  res.end();
}