var express = require('express');
var router = module.exports = express.Router();
var mongo = require('mongodb');

var collectionName = 'pis';

router.post('/save', function(req, res) {
  var collection = req.db.collection(collectionName);
  collection.insert({
    'nom' : req.body.nom,
    'cognoms' : req.body.cognoms,
    'titol' : req.body.titol,
    'descripcio' : req.body.descripcio,
    'ofereixo' : req.body.ofereixo,
    'busco' : req.body.busco,
    'ciutat' : req.body.ciutat,
    'direccio' : req.body.direccio,
    'telefon' : req.body.telefon,
    'genere' : req.body.genere,
    'edatMin' : req.body.edatMin,
    'edatMax' : req.body.edatMax,
    'lat' : req.body.lat,
    'long' : req.body.long
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
  var id = mongo.ObjectID(req.body.id);
  collection.update({ _id : id }, { $set : {
    'nom' : req.body.nom,
    'cognoms' : req.body.cognoms,
    'titol' : req.body.titol,
    'descripcio' : req.body.descripcio,
    'ofereixo' : req.body.ofereixo,
    'busco' : req.body.busco,
    'ciutat' : req.body.ciutat,
    'direccio' : req.body.direccio,
    'telefon' : req.body.telefon,
    'genere' : req.body.genere,
    'edatMin' : req.body.edatMin,
    'edatMax' : req.body.edatMax,
    'lat' : req.body.lat,
    'long' : req.body.long
  }}, function(error, data) {
    if (error) res.status(500).json(error);
    else res.statu(200).json(data);
  });
});

router.get('/search/:str', function(req, res) {
  var str = req.params.str;
  var collection = req.db.collection(collectionName);
  collection.find({$or : [{"ciutat" : {$regex : ".*"+str+".*", $options : "-i"}}, {"titol" : {$regex : ".*"+str+".*", $options : "-i"}}]}).toArray(function(error, data) {
    if (error) res.status(500).json(error);
    else res.status(200).json(data);
  });
});

router.get('/get/:pisId', function(req, res) {
  var collection = req.db.collection(collectionName);
  var id = mongo.ObjectID(req.params.pisId);
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
