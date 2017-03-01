'use strict';

const Q = require('q');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

const connectToDatabase = function () {
  return Q.Promise(function (resolve, reject, notify) {
    MongoClient.connect(process.env.MONGODB_URI, function (err, db) {
      if (err) {
        reject(new Error(err));
      } else {
        console.log('Database connection ready');
        database = db;
        resolve(db);
      }
    });
  });
};

const writeToDatabase = function (params) {
  let document = params.document;
  let collection = params.collection;
  if (document === undefined || collection === undefined) {
    throw new Error('writeToDatabase(params) requires both a params.document and params.collection property');
  }
  let dbCollection = database.collection(collection);
  dbCollection.update({ date: document.date }, document, { upsert: true }, function (err, result) {
    console.log('successfully wrote to database.');
  });
};

module.exports = {
  start: connectToDatabase,
  write: writeToDatabase
};

// var writeToDatabase = function (entries) {  // expects array of objects/documents
//   var deferred = Q.defer();

//
//   collection.insertMany(entries, function(err, result) {
//     if (err) {
//       deferred.reject(new Error(err));
//       res.status(500).send("DB write failed");
//     } else {
//       // Return the added score
//       deferred.resolve(developers);
//       res.json(result);
//     }
//   });

//   return deferred.promise;
// };

// var collection = database.collection('time');
// collection.find({ name: fullName }).toArray(function (err, result) {
//   if (err) {
//   } else {
//     if (result.length === 0) {
//       collection.insert({
//         name: fullName,
//         dates: {}
//       }, function (err, result) {
//         if (err) {
//         } else {
//           console.log(result);
//         }
//       });
//     }
//   }
// });

// {
//   "name": "tyler shambora",
//   "dates": {
//     "2017": {
//       "january": [{
//         "totalTime": 18.75,
//         "billableTime": 6.25
//       }, {
//         "totalTime": 18.75,
//         "billableTime": 6.25
//       }],
//       "february": [{
//         "totalTime": 18.75,
//         "billableTime": 6.25
//       }, {
//         "totalTime": 18.75,
//         "billableTime": 6.25
//       }]
//     }
//   }
// }

// or

// {
//   "name": "2017-02-13",
//   "totals": [{
//     "id": 854170,
//     "name": "tyler shambora",
//     "hours": {
//       totalTime: 7,
//       billableTime: 4
//     }
//   }, {
//     "id": 1307714,
//     "name": "steph brock",
//     "hours": {
//       totalTime: 8,
//       billableTime: 3
//     }
//   }, {
//     "id": 1349162,
//     "name": "sam webb",
//     "hours": {
//       totalTime: 8,
//       billableTime: 6.5
//     }
//   }, {
//     ...
//   }]
// }


// for_day: '2017-02-13',
