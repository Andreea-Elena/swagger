const Automobile = require('../models/Automobile');
var Parser = require('json2csv');

exports.getAllDataCsv = function(args, res, next) {
    const fields = [
        {
          label: 'Id',
          value: '_id',
        },
        {
          label: 'Symboling',
          value: 'symboling',
        },
        {
          label: 'Normalized losses',
          value: 'normalizedlosses',
        },
        {
          label: 'Make',
          value: 'make',
        },
        {
          label: 'Fuel type',
          value: 'fueltype',
        },
        {
          label: 'Aspiration',
          value: 'aspiration',
        },
        {
          label: 'Number of doors',
          value: 'numofdoors',
        },
        {
          label: 'Body style',
          value: 'bodystyle',
        },
        {
          label: 'Drive wheels',
          value: 'drivewheels',
        },
        {
          label: 'Engine location',
          value: 'enginelocation',
        },
        {
          label: 'Wheel base',
          value: 'wheelbase',
        },
        {
          label: 'Length',
          value: 'length',
        },
        {
          label: 'Width',
          value: 'width',
        },
        {
          label: 'Height',
          value: 'height',
        },
        {
          label: 'Curb weight',
          value: 'curbweight',
        },
        {
          label: 'Engine type',
          value: 'enginetype',
        },
        {
          label: 'Number of cylinders',
          value: 'numofcylinders',
        },
        {
          label: 'Engine size',
          value: 'enginesize',
        },
        {
          label: 'Fuel system',
          value: 'fuelsystem',
        },
        {
          label: 'Bore',
          value: 'bore',
        },
        {
          label: 'Stroke',
          value: 'stroke',
        },
        {
          label: 'Compression ratio',
          value: 'compressionratio',
        },
        {
          label: 'Horsepower',
          value: 'horsepower',
        },
        {
          label: 'Peak rpm',
          value: 'peakrpm',
        },
        {
          label: 'City mpg',
          value: 'citympg',
        },
        {
          label: 'Highway mpg',
          value: 'highwaympg',
        },
        {
          label: 'Price',
          value: 'price',
        }
    ];

    Automobile.find({})
    .then(automobiles => {
      return downloadResource(res, fields, automobiles);
    }, err => next(err))
    .catch(err => next(err));

}
 
const downloadResource = (res, fields, data) => {
  const json2csv = new Parser.Parser({ fields });
  const csv = json2csv.parse(data);
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  return res.end(csv);
}