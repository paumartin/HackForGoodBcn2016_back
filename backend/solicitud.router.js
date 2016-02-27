var express = require('express');
var router = module.exports = express.Router();
var mongo = require('mongodb');

var collectionName = 'solicitud';

router.post('/save', function(req, res) {
  var collection = req.db.collection(collectionName);
  collection.insert({
    'pisId' : req.body.pisId,
    'estudiantId' : req.body.estudiantId,
    'estat' : false,
    'missatge' : req.body.missatge
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
    'pisId' : req.body.pisId,
    'estudiantId' : req.body.estudiantId,
    'estat' : req.body.estat,
    'missatge' : req.body.missatge
  }}, function(error, data) {
    if (error) res.status(500).json(error);
    else res.status(200).json(data);
  });
});

router.get('/accept/:solicitudId', function(req, res) {
  if (!req.params.solicitudId) {
    res.status(500).send("Id Required");
    return;
  }
  var collection = req.db.collection(collectionName);
  var id = mongo.ObjectID(req.params.solicitudId);
  collection.update({_id : id}, {$set : {estat : true}}, function(error, data) {
    if (error) res.status(500).json(error);
    else res.status(200).json(data);
  });
});

router.get('/get/:solicitudtId', function(req, res) {
  var collection = req.db.collection(collectionName);
  var id = mongo.ObjectID(req.params.solicitudId);
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
