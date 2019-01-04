import React, { Component } from 'react';


import './styles/eatOut.css';


//Components
import Header from '../components/headerComponent/header'; 
import Map from '../components/bodyComponent/map';
import BackButton from '../components/bodyComponent/backButton';
import Recipe from '../components/bodyComponent/recipe';

import {
  BrowserRouter as 
  Router,
  Redirect,
  Route,
  Link,
  withRouter
} from "react-router-dom";

class EatOut extends Component {

  constructor(props) {
    super(props);   
    this.state = {
      isShow: true,
      pins: [],
      latitude:45.501690,
      longitude:-73.567353,
      budget:10,
      data:'',
      recipes:[]
    }

    this.saveWallet = this.saveWallet.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.coordinatesCallback = this.coordinatesCallback.bind(this);
    this.geoFindMe = this.geoFindMe.bind(this);
  }

  componentDidMount() {
    this.setState({id:this.props.data});
    // Call our fetch function below once the component mounts
    // In our package.json we have to add the line "proxy": "http://localhost:3001/"
    // This will let Webpack know to proxy our API requests to our Express backend that will be running on port 3001
    this.callBackendAPI()
      .then(res => console.log(res)) //set data to the response from the fetch request
      .catch(err => console.log(err));
    //this.state.restaurants = callBackendAPI()
  }

  //API REquest
   callBackendAPI = async () => {
    console.log("lat:",this.state.latitude ," long: ",  this.state.longitude);

    const response = await fetch('/wallet/loc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "lattitude":this.state.latitude,"longitude":this.state.longitude }),
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }

    var restaurants = [];
    var restos = []
    for (var i = 0; i < body.restaurants.length; i++)
    {
      var rest = body.restaurants[i].restaurant;
      //restaurants.push({'lng':rest.location.longitude,'lat':rest.location.latitude,'name':rest.name, 'price':rest.price_range});
      restaurants.push({'lng':rest.location.longitude,'lat':rest.location.latitude,
        'name':rest.name,'price':rest.average_cost_for_two/2,'budget':Number(this.state.budget)});
      restos.push({"title":rest.name,"url":rest.url,"image":rest.featured_image})
    }

    console.log(body);
    console.log(restaurants);

    this.setState({pins:restaurants,recipes:restos});

    return restaurants;
  };
  ///
  ///
  //

  geoFindMe() {
      var output = document.getElementById("out");
      let comp = this;

      if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
      }

      function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
        comp.setState({
          latitude:latitude,
          longitude:longitude});
        comp.callBackendAPI();
      }

      function error() {
        output.innerHTML = "Unable to retrieve your location";
      }
      output.innerHTML = "<p>Locating…</p>";
      navigator.geolocation.getCurrentPosition(success, error);
    }

  saveWallet(event)
  {
    console.log(event.target.value);
    console.log('here');
    var pins = this.state.pins;
    console.log('here');
    for(var i = 0; i<pins.length; i++)
    {
      pins[i].budget = event.target.value;
      console.log(pins[i].budget);
    }

    this.setState({pins:pins});

    this.setState({budget:event.target.value});
  }

  handleSubmit(event) {
    //alert('New Wallet Set: ' + this.state.budget);
    event.preventDefault();
  }

  coordinatesCallback(center)
  {
    console.log("CoordinatesCallback", center);
    
    this.setState({
      latitude:center[0],
      longitude:center[1]});

    this.callBackendAPI()
      .then(res => console.log(res)) //set data to the response from the fetch request
      .catch(err => console.log(err));

    
  }

  render() {
    if(this.props.data===""||this.props.data===undefined||this.props.data.length==0)
    {
      console.log("yeet");
      return(
          <Redirect to='/'/>
        );
    }
    return (
      <div className="eat-out">
        <Header />
        <div className="side-bar">  
          <p><button onClick={this.geoFindMe}>Show my location</button></p>
          <div id="out"></div>

          <form>
            <input type="text" id="wallet" placeholder="Enter Your Budget" onChange={this.saveWallet} value={this.state.budget}/>
            <input type="Submit" id="saveB" value="save" onClick={this.handleSubmit}/>
          </form>

          <p>Restaurants</p>
          <div className="scroll">
          <Recipe
              recipes={this.state.recipes}
            />
          </div>

        </div>

        <div className="main-bar">
            <Map
            pins={this.state.pins}
            callback={this.coordinatesCallback}
            />
        </div>

      </div>
    );
  }
}
export default EatOut;
