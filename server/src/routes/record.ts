import express from 'express';
import { ObjectId } from 'mongodb';
import { getDB } from '../db/conn';

const recordRoutes = express.Router();

//get all the records
recordRoutes.route('/record').get((req,res)=>{
  let db_connect = getDB();
  db_connect.
    collection('records')
    .find({})
    .toArray((err,result)=>{
      if(err) throw err;
      res.json(result);
    })
})

//get single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = getDB();
  let myquery = { _id: new ObjectId(req.params.id) };
  db_connect
    .collection("records")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//add record
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = getDB();
  let myobj = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//update single record by id
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = getDB();
  let myquery = { _id: new ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

 // This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = getDB();
  let myquery = { _id: new ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

export default recordRoutes;