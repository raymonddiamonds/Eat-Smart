const express = require('express');
const router = express.Router();
//just for testing
const Pantry = require('../models/user');
const request = require('request');

//add location to the user
router.post('/location/:id',(req,res,next)=>{
	Pantry.findById(req.params.id, function(err, record){
	    if (record!=null) {
	    	record.location = req.body.location;
	    	record.save().then(function(record2){
				if(result!=undefined)
				{
					res.send('succesfully added '+String(result.location)+' as your location');
				}
				else
				{
					res.send('There exists no such item');
				}
			});
	    }
	   	else{
			res.send("could not find user.");
		}
  	});
});

//add budget to the user
router.post('/budget/:id',(req,res,next)=>{
	Pantry.findById(req.params.id, function(err, record){
	    if (record!=null) {
	    	record.budget = req.body.budget;
	    	record.save().then(function(record2){
				if(result!=undefined)
				{
					res.send('succesfully added '+String(result.budget)+' to your virtual wallet');
				}
				else
				{
					res.send('There exists no such item');
				}
			});
	    }
	   	else{
			res.send("could not find user.");
		}
  	});
});

//get user 'eat-out' credentials
router.get(('/:id'),(req,res,next)=>{

	Pantry.findById(req.params.id, function(err, post){
	    if (post) {
	    	res.status(500).send(post.location+post.wallet);
	    }
	   	else{
			res.send("could not find");
		}
  	});
});

router.post(('/loc'),(req,res,next)=>{
	var lat = req.body.lattitude;
	var long = req.body.longitude;

	var options ={
		headers:{
			"user-key":"409b7c6b66fccf729931efcaf79ea497"
		}
	}

	//sort=real_distance

	request.get('https://developers.zomato.com/api/v2.1/search?lat='+lat+'&lon='+long+'&radius=2000&sort=real_distance&count=50',options,function(err,zres,body){
	  if(err){
	  	console.log("problem");
	  	res.send(err);
	  }
	  if(zres.statusCode !== 200 )
	  {
	  	console.log(zres.statusCode+" Error");
	  	res.send(body);
	  }
	  else
	  {
	  	console.log("success!");
	  	res.send(body);
	  }
	  
	});

// req.on('error', function(e) {
//   console.log('ERROR: ' + e.message);
// });

// 	var lat = req.body.lattitude;
// 	var long = req.body.longitude;

// 	var request = new XMLHttpRequest();
// 	// Open a new connection, using the GET request on the URL endpoint
// 	request.open('GET', 'https://developers.zomato.com/api/v2.1/search?lat='+lat+'&lon='+long+'&radius='+'500', true);
// 	request.setRequestHeader("user-key","409b7c6b66fccf729931efcaf79ea497" );

// 	request.onload = function () {
// 		var data = JSON.parse(this.response);

// 		if (request.status >= 200 && request.status < 400) {
// 			res.send(data.restaurants);
// 		}
// 		else {
// 			console.log("FAILED");
// 			res.send("API Request Failed");
// 		}
// 	}

	// Send request
	// request.send();
});

module.exports = router; 