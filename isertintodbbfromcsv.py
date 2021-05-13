import csv
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
database = client['mydb']
collection = database['automobiles']

#CSV to JSON Conversion
csvfile = open('Automobile_price_data_Raw_.csv', 'r')
reader = csv.DictReader( csvfile )
header= [ "symboling","normalizedlosses","make","fueltype","aspiration","numofdoors","bodystyle","drivewheels","enginelocation",
"wheelbase","length","width","height","curbweight","enginetype","numofcylinders","enginesize","fuelsystem","bore","stroke",
"compressionratio","horsepower","peakrpm","citympg","highwaympg","price"
]

for each in reader:
    row={}
    for field in header:
        row[field]=each[field]
    print(row)
    collection.insert_one(row)