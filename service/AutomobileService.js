var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/mydb";
var ObjectId = require('mongodb').ObjectId; 
var Parser = require('json2csv');

exports.getAllDataCsv = function(args, res, next) {
    const fields = [
        {
          label: 'Id',
          value: '_id'
        },
        {
          label: 'Text',
          value: 'text'
        }
    ];
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("notes").find({}).toArray(function(err, result) {
            if (err) throw err;
            return downloadResource(res, 'notes.csv', fields, result);
        });
        db.close();
    });

}
 
const downloadResource = (res, fileName, fields, data) => {
  const json2csv = new Parser.Parser({ fields });
  const csv = json2csv.parse(data);
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  //res.attachment(fileName);
  return res.end(csv);
}