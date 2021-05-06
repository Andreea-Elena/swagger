'use strict';
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/mydb";
var ObjectId = require('mongodb').ObjectId; 

exports.getAllNotes = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("notes").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.end(JSON.stringify(result));
      db.close();
    });
  }); 
}

exports.postNote = function(args, res, next) {
  /**
   * parameters expected in the args:
  * note (Note)
  **/
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { text: args.note.value.text }
    dbo.collection("notes").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 note inserted");
      db.close();
    });
    res.end(JSON.stringify(myobj))
  }); 
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
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { _id : new ObjectId(args.id.value)  };
    dbo.collection("notes").find(query).toArray(function(err, result) {
      if (err) throw err;
      res.end(JSON.stringify(result));
      db.close();
    });
  }); 
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

exports.getCreateDatabase = async function(req, res, next) {
  /**
  **/
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 204;

  await MongoClient.connect(url, function(err, database) {
    if (err) throw err;
    console.log("Database created!");
    var dbo = database.db("mydb");
    dbo.createCollection("notes", function(err, res) {
      if (err) throw err;
      console.log("Notes created!");
      database.close(); 
    });
  });
  res.end('Database created!')
}