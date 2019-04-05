var express = require('express');
var app = express();
//var path = require('path');
var bodyParser = require('body-parser');
var mongo = require("mongodb").MongoClient;
var assert = require('assert');
var router = express.Router();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

var server = "mongodb://localhost:27017"
mongo.connect(server, function (err, response) {
    if (err)

        console.log(err);

    else

        console.log("Connection established successfully in Mongodb");
        db = response.db('db_visitors');

         })
         

// app.post("/api/SaveUser", function (req, res, next) {
//     console.log('******************')
//     console.log(req.body)
//     console.log('******************')
//     var visitor={
//         name:req.body.name,
//         visitorid:req.body.visitorid,
//         in_time:req.body.in_time,
//         comingfrom:req.body.comingfrom,
//         authorizedname:req.body.authorizedname,
//         authorizedid:req.body.authorizedid

//     };

//     db.collection("details").insertOne(visitor,function(err,docs){
//        assert.equal(null,err);
//        console.log('item has been inserted');
//       res.send(docs);
//             db.close;
//     })
// })

app.get("api/SaveUser", function (req, res, next) {
    console.log('******************<<<<<<<<<<<<<<<')
    console.log(req.body)
    console.log('******************')
    // var visitor={
    //     name:req.body.name,
    //     visitorid:req.body.visitorid,
    //     in_time:req.body.in_time,
    //     comingfrom:req.body.comingfrom,
    //     authorizedname:req.body.authorizedname,
    //     authorizedid:req.body.authorizedid

    // };

    // db.collection("details").insertOne(visitor,function(err,docs){
    //    assert.equal(null,err);
    //    console.log('item has been inserted');
    //   res.send(docs);
    //         db.close;
    // })
})

app.get("/api/getUser", function (req, res, next) {
    db.collection("details").find({}).toArray(function (err, docs) {

        if(err){
            return err;
        }else{
            res.send(docs);
        }
    })

})
//module.exports = router;

app.listen(3000);
console.log("Server started")
