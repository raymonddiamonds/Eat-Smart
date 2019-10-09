const express = require('express');
const http = require('http');
const unirest = require('unirest');
const router = express.Router();
//just for testing
const Pantry = require('../models/user');
//const PostController = require('../CRUD/controller');

//geting pantry items
//these routes should connect to connections in CRUD

//!--READ--!
router.get('/pantry/:id',(req,res,next)=>{

  Pantry.findById(req.params.id, function(err, post){
      if (post) {
        res.status(500).send(post.pantryitems);
      }
      else{
      res.send("could not find");
    }
    });
}); // so now its /api/pantry -> connected to this method


//!--UPDATE--! adding pantryitem
router.post('/additem/:id',(req,res,next)=>{

  //add ingredient to pantry
  var ingredient = {name:req.body.ingredient,quantity:1};

  Pantry.findById(req.params.id, function(err, record){
    //add an ingredient to the pantryitems collection
    if(record!=null) {
      record.pantryitems.push(ingredient);

      record.save().then(function(record2){
        var result = record2.pantryitems.find(obj => {
          return obj.name === ingredient.name;
        });

        if(result!=undefined){
          res.send('succesfully added '+String(result.name)+' to the pantry');
        } else{
          res.send('There exists no such item');
        }
      });
    }
    else {
      res.send('could not find user by that key');
    }
  });
});
//

//!--DESTROY--!
//Delete ingredient
router.post('/deleteitem/:id',(req,res,next)=>{
  //delete ingredient from pantry

  var ingredient = req.body.ingredient;
  Pantry.findById(req.params.id, function(err,record){
    if(record!=null) {
      var result = record.pantryitems.find(obj => {
        return obj.name === ingredient;
      });

      if(result!=undefined) {
        record.pantryitems.pull(result);
        record.save();

        res.send(ingredient+' was removed');
      }
      else{
        res.send('There exists no such item');
      }
    }
    else{
      res.send('no id matches this user');
    }
    
  });
});

router.get('/recipeInfo/:id',(req,res,next)=>{{
  var recipeId = req.params.id;

  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+recipeId+"/information")
  .header("X-RapidAPI-Key", "VABWfwhrZtmsht2xpwFIwwsQqmOdp1n320cjsnXxpuXczedJU3")
  .end(function (result) {
    console.log(result.body);
    res.send(result.body);
  });

  }
});

//Gets the spoonacular recipes which match the pantry
router.get('/recipes/:id',(req,res,next)=>{

  Pantry.findById(req.params.id, function(err, post){
      if (post) {

        //fetches the users pantry from the db
        var usr_pantry = post.pantryitems;

        //URL for the apirequest
        var apiRequestH = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&fillIngredients=true&ranking=1&ingredients=";

        console.log('problem?');
        for (var i = 0; i < usr_pantry.length; i++) {
          apiRequestH += String(usr_pantry[i].name)
          if(i!=(usr_pantry.length-1)) {
            apiRequestH += "%2C";
          }
          console.log(usr_pantry[i].name+'\n');
        }

        unirest.get(apiRequestH)
        .header("X-RapidAPI-Key", "VABWfwhrZtmsht2xpwFIwwsQqmOdp1n320cjsnXxpuXczedJU3")
        .end(function (result) {

          var recipes = result.body;
          var recipeObjs = [];

          for(var i = 0; i<recipes.length; i++) {       
            recipeObjs.push({"image":recipes[i].image,"title":recipes[i].title,"id":recipes[i].id});        
          }

          var resObj = getRecipe(recipeObjs, res);
        });
      } else{
        res.send("could not find");
      }
    });
});

function getRecipe(id, res) {
  var header = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=";
  for(var i = 0; i<(id.length -1); i++) {
    header += id[i].id+'%2C';
    console.log(id[i].id);
  }

  if(id.length>1) {
    header+=id[id.length-1].id;

    unirest.get(header)
      .header("X-RapidAPI-Key", "VABWfwhrZtmsht2xpwFIwwsQqmOdp1n320cjsnXxpuXczedJU3")
      .end(function (result) {
        var recipeObjs = [];
        console.log(result.body);
        var body = result.body;
        for(var j = 0; j<id.length; j++)
        {
          recipeObjs.push({"image":id[j].image,"title":id[j].title,"id":id[j].id, "url":body[j].sourceUrl});
          console.log(body[j])
        }
        console.log(body.length);

        res.send(recipeObjs);
      });
  }
  else {
    res.send("no recipes");
  }
}

router.get('/getrecipe/:id',(req,res,next)=>{

  console.log(req.params.id);
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+req.params.id+"/information")
  .header("X-RapidAPI-Key", "VABWfwhrZtmsht2xpwFIwwsQqmOdp1n320cjsnXxpuXczedJU3")
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
    res.send(result.body);
  });
});

//export the router
module.exports = router; 
