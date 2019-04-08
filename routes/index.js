var express = require('express');
const fs = require('fs');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var assert = require('assert');

var db;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ "extended": false }));

var server = "mongodb://localhost:27017"
mongo.connect(server, function (err, response) {
    if (err)

        console.log(err);

    else

        console.log("Connection established successfully in Mongodb");
        db = response.db('db_visitors');

         })
         

router.post("/api/SaveUser", function (req, res, next) {
    console.log('******************')
    console.log(req.body)
    console.log('******************')
    // const visitor={
    //     name:req.body.name,
    //     visitorid:req.body.visitorid,
    //     in_time:req.body.in_time,
    //     comingfrom:req.body.comingfrom,
    //     ssoid:req.body.ssoid,
    //     authorizedname:req.body.authorizedname,
    //     authorizedid:req.body.authorizedid

    // };

    // db.collection("details").insertOne(visitor,function(err,docs){
    //    assert.equal(null,err);
    //    console.log('item has been inserted');
    //   res.send(docs);
            
    // })
    db.collection('details').find({ssoid:req.body.ssoid}).toArray(function(err,results)
    {
         console.log('666666666666666');
          if(results.length>0)
          {
              console.log("already exist");
              return res.status(400).json("Already exist");
          }
          else
          {
              db.collection('details').insertOne(req.body,(err,result)=>{
                  if(err){
                    return res.status(400).json(err);
                  }else{
                     return res.status(201).json("saved to database"); 
                  }
              })
          }
    })
})


router.get("/api/GetUser", function (req, res, next) {
    db.collection("details").find({}).toArray(function (err, docs) {

        if(err){
            return err;
        }else{
            res.send(docs);
        }
    })

})
router.post("/api/EditUser",function(req,res,next){
    let reqparameter=req.body;
    console.log(reqparameter);
     var myquery={"ssoid":  reqparameter.ssoid};
     const update = {$set: {"name": reqparameter.name ,"id":reqparameter.id ,"time":reqparameter.time,"cf" : reqparameter.cf,"authname":reqparameter.authname ,"authid":reqparameter.authid}};
     const options = { "upsert": false };
    // // var newvalues={$set:{name:'',id:'',time:'',cf:'',authname:'',authid:''}};
      //var newvalues={$set:{"ssoid":reqparameter.ssoid}};
    db.collection("details").updateOne(myquery,update, function(err,docs){
        if(err){
            return res.status(400).json(err);
        }else{
            return res.status(201).json("updated"); 
        }
    })

})
router.post("/api/DeleteUser",function(req,res,next){
    let visitor = req.body;
    var myquery = { 'ssoid': visitor.ssoid };
    
    db.collection("details").deleteOne(myquery ,function(err,docs){
        if(err){
            return res.status(400).json(err);
        }else{
            return res.status(201).json("deleted"); 
        }
    })

})
router.post("/api/Gettime",function(req,res,next){
    let visitor=req.body;
    var myquery={"ssoid":  visitor.ssoid};
  // const update={$set: { dateAdded: new Date()}};
   const update={$set: { dateAdded:  Date()}};
 const options = { "upsert": true };
   
    //db.collection("details").insertOne( {$currentDate: {$type: "date"}},
    //db.collection("details").insertOne( {outtime: { dateAdded: new Date() }},  { "upsert": true },
    db.collection("details").updateOne(myquery,update,
    function(err,docs){
        if(err){
            console.log(err)
            return res.status(400).json(err);
        }else{
            return res.status(201).json("success"); 
            
        }
    });

})
module.exports = router;


 


