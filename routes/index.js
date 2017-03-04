var config  = require('../config.json');
var express = require('express');
var router  = express.Router();
var baseMap = [];
var currMap = baseMap;

//Food is a 2; Snakes are 1; empty is 0;

var bodyParser = require('body-parser');
var width;
var height;


  router.use(bodyParser.json());//
  router.use(bodyParser.urlencoded({extended: false }));
  router.get(config.routes.info, function (req, res) {
  // Response data

  var data = {
    color: config.snake.color,
    head_url: config.snake.head_url,
  };

  return res.json(data);
});


  router.post(config.routes.start, function (req, res) {

  console.log(JSON.stringify(req.body));
  console.log(req.body.width);

  width = req.body.width;
  height = req.body.height;
  for(i = 0; i < width * height; i++){
       baseMap.push([0,0]);
  }
  currMap = baseMap;


  // Response data
  var data = {
    taunt: config.snake.taunt.start,
    head_type: "fang",
    tail_type: "fat-rattle"
  };

  return res.json(data);
});

// Handle POST request to '/move'
router.post(config.routes.move, function (req, res) {



  // Response data
  var data = {
    move: 'north', // one of: ["north", "east", "south", "west"]
    taunt: config.snake.taunt.move
  };

  return res.json(data);
});

// Handle POST request to '/end'
router.post(config.routes.end, function (req, res) {
  // Do something here to end your snake's session

  // We don't need a response so just send back a 200
  res.status(200);
  res.end();
  return;
});


module.exports = router;
