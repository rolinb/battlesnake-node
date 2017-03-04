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
  // update map
  us = req.body.you;

  console.log(us);
  var headx;
  var heady;

  console.log(req.body.snakes.length);
  notUs = [];
  //console.log(notUs.length);
  for(i = 0; i<req.body.snakes.length; i++){
    console.log("test");

    console.log(notUs.length);
       if(req.body.snakes[i].id === us){
            console.log("found my head");
            var head = JSON.stringify(req.body.snakes[i].coords[0]).split(',');

             headx = head[0].replace(/\D+/g, '');
             heady = head[1].replace(/\D+/g, '');
            console.log("head section done?");
            for (j =1; j <req.body.snakes[i].coords.length; j++){
              console.log(req.body.snakes[i].coords[i]);
              var locations = JSON.stringify(req.body.snakes[i].coords[i]).split(',');
              currMap[locations[0].replace(/\D+/g, '')][locations[1].replace(/\D+/g, '')] = 1;
            }
       }
       else{
         for (j =0; j <req.body.snakes[i].coords.length; j++){
           console.log(req.body.snakes[i].coords[i]);
           var locations = JSON.stringify(req.body.snakes[i].coords[i]).split(',');
           currMap[locations[0].replace(/\D+/g, '')][locations[1].replace(/\D+/g, '')] = 1;
         }
       }

  }
  var intx = parseInt(headx);
  var inty = parseInt(heady);
  currMap[intx][inty] = 3;
  console.log("A");
  var path=false;
  var direction = 'north';
  while(!path){
    console.log("b");
    //north
    console.log(currMap[intx][inty]);


    if(inty+1 < height && currMap[intx][inty+1] == 0){
      path = true;
      direction = 'south';
      console.log(direction);
    }
    else if(intx+1 < width && [intx+1][inty] == 0){
      path =true;
      direction = 'east';
      console.log(direction);
    }
    else if(inty-1 > width && currMap[intx][inty-1] == 0){
      path = true;
      direction = 'north';
      console.log(direction);
    }
    else if(intx-1 > height && currMap[intx-1][inty] == 0){
      path = true;
      direction = 'west';
      console.log(direction);
    }
    else{
      console.log("never should have got here");
    }

  }

console.log("C");

  // Response data
  var data = {
    move: direction, // one of: ["north", "east", "south", "west"]
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
