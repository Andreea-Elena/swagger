const Automobile = require('../models/Automobile');
var Parser = require('json2csv');

exports.getAllDataCsv = function(args, res, next) {
    const fields = [
        {
          label: 'symboling',
          value: 'symboling',
        },
        {
          label: 'normalized-losses',
          value: 'normalizedlosses',
        },
        {
          label: 'make',
          value: 'make',
        },
        {
          label: 'fuel-type',
          value: 'fueltype',
        },
        {
          label: 'aspiration',
          value: 'aspiration',
        },
        {
          label: 'num-of-doors',
          value: 'numofdoors',
        },
        {
          label: 'body-style',
          value: 'bodystyle',
        },
        {
          label: 'drive-wheels',
          value: 'drivewheels',
        },
        {
          label: 'engine-location',
          value: 'enginelocation',
        },
        {
          label: 'wheel-base',
          value: 'wheelbase',
        },
        {
          label: 'length',
          value: 'length',
        },
        {
          label: 'width',
          value: 'width',
        },
        {
          label: 'height',
          value: 'height',
        },
        {
          label: 'curb-weight',
          value: 'curbweight',
        },
        {
          label: 'engine-type',
          value: 'enginetype',
        },
        {
          label: 'num-of-cylinders',
          value: 'numofcylinders',
        },
        {
          label: 'engine-size',
          value: 'enginesize',
        },
        {
          label: 'fuel-system',
          value: 'fuelsystem',
        },
        {
          label: 'bore',
          value: 'bore',
        },
        {
          label: 'stroke',
          value: 'stroke',
        },
        {
          label: 'compression-ratio',
          value: 'compressionratio',
        },
        {
          label: 'horsepower',
          value: 'horsepower',
        },
        {
          label: 'peak-rpm',
          value: 'peakrpm',
        },
        {
          label: 'city-mpg',
          value: 'citympg',
        },
        {
          label: 'highway-mpg',
          value: 'highwaympg',
        },
        {
          label: 'price',
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