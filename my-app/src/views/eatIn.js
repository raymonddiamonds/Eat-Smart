import React, { Component } from 'react';
import './styles/eatIn.css';

//Components
import Header from '../components/headerComponent/header';
import Pantry from '../components/bodyComponent/pantry';
import Recipe from '../components/bodyComponent/recipe';
import BackButton from '../components/bodyComponent/backButton';

import { BrowserRouter as Router,Redirect,Route,Link,withRouter } from "react-router-dom";

class EatIn extends Component {

	constructor(props) {
      super(props);   
      this.state = {
        ingredients:[],
        ingredient:'',
        recipes: [] ,
        id: this.props.id
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDeleteCallback = this.handleDeleteCallback.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
    }

	componentDidMount() {
      console.log("DATA:",this.props.data)
      this.setState({id:this.props.data},

	function() {
        console.log("ID:",this.state.id);
        fetch('/pantry/recipes/'+this.state.id)
          .then(res => {
              console.log("hello",res);
              return res.json()
           })
          .then(recipes => { 
              this.setState({ recipes: recipes })
           });

        fetch('/pantry/pantry/'+this.state.id)
          .then(res => {
              console.log(res);
              return res.json()
           })
          .then(ingredients => {  

            this.setState({ ingredients: ingredients })
        });
      });

	}

	handleDeleteCallback(index){

	fetch('/pantry/deleteitem/'+this.state.id,{method:"post",headers:{'Content-Type':'application/json'},

	// make sure to serialize your JSON body
	body:JSON.stringify({ingredient:this.state.ingredients[index].name,})}).then(res=>{if(res.status===200){console.log("succesfully delete")this.setState({ingredients:this.state.ingredients.filter(function(e,i){return i!==index;})});}else{console.log("Error with deleting item.")}})}

	handleChange(event){this.setState({ingredient:event.target.value});}

	handleSearch() {
      fetch('/pantry/recipes/'+this.state.id)
        .then(res => {
            console.log(res);
            return res.json()
         })
        .then(recipes => { 
            this.setState({ recipes: recipes })
         });
    }

	handleSubmit(event) {
      console.log("event", event.target.value)
      var ingredients = this.state.ingredients

      //Creating JSON to be sent to express
      var body = JSON.stringify({"ingredient": this.state.ingredient})

      if (this.state.ingredient === "") {
          alert("Name must be filled out");
          return false;
      } else {
        ingredients.push({ _id: "dummyID",name: this.state.ingredient,quantity: 1})

        /*Post request to express route */
        fetch('/pantry/additem/'+this.state.id, {
          method: "post",
          headers: {'Content-Type': 'application/json'},

          //make sure to serialize your JSON body
          body: JSON.stringify({
            ingredient: this.state.ingredient,
          })
        }).then(res =>  {
            console.log("POST REQ(add item):", res);
            if(res.status === 200) {
              this.setState({ingredients: ingredients,ingredient: ''})
              return res.json()
            } else {
              console.log("Error with adding item")
            }
          }) 

        event.preventDefault();
      }
    }

	render() {

    console.log("API RESPONSE: ", this.state.ingredients)
    var recipes = this.state.recipes
    var ingredients = this.state.ingredients

    if(this.props.data===""||this.props.data===undefined||this.props.data.length==0)
    {
      console.log("yeet");
      return(
          <Redirect to='/'/>
        );
    }

    return (
      <div className="eat-in">
        <Header />
        <div className="side-bar">  
          <p className="titleTxt">Pantry</p>

          <Pantry 
            className="pantry"
            ingredients= {ingredients}
            handleDeleteCallback= {this.handleDeleteCallback}
          />
    
          <p className="titleTxt">New Ingredient</p>
  
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="ingredient" value={this.state.ingredient} placeholder="New ingredient" onChange={this.handleChange} className="but"/> 
            <input type="submit" id="submit" value="Add" className="but"/>
          </form>

          <button id="save" onClick={this.handleSearch} className="but">Save & Search</button>

         
        </div>

        <div className="main-bar">
          <p className="titleTxt" >Recipes</p>

          <div className="recipes">

            <Recipe
              recipes={this.state.recipes}
            />

          </div>
        </div>


      </div>
    );
  }
}


export default EatIn;
