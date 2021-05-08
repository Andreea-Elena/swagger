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
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { _id: new ObjectId(args.id.value) };
    var newvalues = { $set: { text: args.note.value.text } };
    dbo.collection("notes").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 note updated");
      db.close();
    });
    res.end()
  }); 
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

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { _id: new ObjectId(args.id.value) };
    var newvalues = { $set: { text: args.note.value.text } };
    dbo.collection("notes").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 note updated");
      db.close();
    });
    res.end()
  }); 
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
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { _id: new ObjectId(args.id.value) };
    dbo.collection("notes").deleteOne(myquery, function(err, resp) {
      if (err) res.end("Invalid id");
      res.end("Note "+args.id.value+" deleted")
      db.close();
    });
    res.end()
  }); 
}

exports.getCreateDatabase = async function(req, res, next) {
  /**
  **/
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 204;

  await MongoClient.connect(url, async function(err, database) { 

      var dbo = database.db("mydb");
      dbo.listCollections().toArray(function(err, collections) {
          var collectionExists = false;
          if(!err && collections && collections.length>0){
            var names = collections.map(a => a.name)
            if (names.includes("notes")){
              collectionExists = true
            }
          }

          if (collectionExists) {
            dbo.collection("notes").drop(function(err, delOK) {
              if (err) throw err;
              if (delOK) console.log("Collection notes deleted")
            });
          } 
          
          dbo.createCollection("notes", function(err, collection) {
            console.log("Collection notes reseted!")
          })

          database.close();
      });
  })  

  res.end('Database created!')
  
}
