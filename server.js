require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); // DB control program

var app = express();
const port=process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

//create a car object
var cars= [{_id:1,make:'ferrari',bhp:20}]

function returnCar(id,cars){
  return cars.find(function(element){

    return element._id=id;

    });

  };


//connect database
mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://twoshotamericano:Munichcity3!@ds249079.mlab.com:49079/cars');

promise.then(function(db) {
 console.log('DATABASE CONNECTED!!');
}).catch(function(err){
 console.log('CONNECTION ERROR', err);
});

// var blogSchema = new Schema({
//   title:  String,
//   author: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
// });
//
// // var Blog = mongoose.model('Blog', blogSchema);


Schema
var Schema = mongoose.Schema;

var carSchema = new Schema({
  make:  String,
  bhp: Number
});

var Car = mongoose.model('Car', carSchema);

//Model


// var cars = [{
//   _id: 0,
//   name: 'ferarri'
// }, {
//   _id: 1,
//   name: 'mini'
// }];
//console.log('arse');
//console.log('my secret is',process.env.MY_BIG_SECRET);

app.get('/cars/:id?', function(req, res){
  var queryObj={};
  if (req.params.id){
    queryObj._id=req.params.id;
  }
  console.log(queryObj._id);
  Car.find(queryObj).exec(function(err,cars){
    if (err) return res.status(500).send(err);
    res.status(200).json(cars);
  });


  //res.status(200).json(cars);
});

app.post('/cars', function(req, res){
  console.log(req.body);

  var carData=req.body;
  var newCar=new Car(carData);
  newCar.save(function(err,car){
      if (err) return res.status(500).send(err);
      res.sendStatus(201);
  })

});


app.put('/cars/:id', function(req, res){

  var updateCarId = req.params.id;
  //
      Car.update({ _id: updateCarId }, req.body, function (err, raw) {
         if (err) return handleError(err);
         console.log('The raw response from Mongo was ', raw);
         return res.sendStatus(200);
      });

});

app.delete('/cars/:id', function(req, res){
  console.log(req.params.id);
  //var carIdForDeletion = req.params.id;
  var deletetableCarId=req.params.id;
  Car.remove({ _id: deletetableCarId }, function (err,deletedCar) {
    if (err) return res.status(500).send(err);
    // removed!
    res.status(204).json(deletedCar);
  });

});



app.listen(port, function(){
  console.log('Server listening');
});
