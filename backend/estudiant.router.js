var express = require('express');
var router = module.exports = express.Router();
var mongo = require('mongodb');

var collectionName = 'estudiant';

router.post('/save', function(req, res) {
  var collection = req.db.collection(collectionName);
  collection.insert({
    'nom' : req.body.nom,
    'cognoms' : req.body.cognoms,
    'genere' : req.body.genere,
    'dataNaixement' : req.body.dataNaixement
  }, function(error, data) {
    if (error) res.status(500).json(error);
    else res.status(200).json(data);
  });
});


router.post('/update', function(req, res) {
  if (!req.body._id) {
    res.status(500).send("Id Required");
    return;
  }
  var collection = req.db.collection(collectionName);
  var id = mongo.ObjectID(req.body._id);
  collection.update({ _id : id }, { $set : {
    'nom' : req.body.nom,
    'cognoms' : req.body.cognoms,
    'genere' : req.body.genere,
    'dataNaixement' : req.body.dataNaixement
  }}, function(error, data) {
    if (error) res.status(500).json(error);
    else res.status(200).json(data);
  });
});

router.get('/get/:estudiantId', function(req, res) {
  var collection = req.db.collection(collectionName);
  var id = mongo.ObjectID(req.params.estudiantId);
  collection.find({_id : id}).toArray(function(error, data) {
    if (error) res.status(500).json(error);
    else res.status(200).json(data);
  });
});

router.get('/getList', function(req, res) {
  var collection = req.db.collection(collectionName);
  collection.find({}).toArray(function(error, data) {
    if (error) res.status(500).json(error);
    else res.status(200).json(data);
  });
});
