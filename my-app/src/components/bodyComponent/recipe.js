import React, { Component } from 'react';
import './styles/recipe.css';


class Recipe extends Component {

  constructor(props) {
    super(props)

    this.state = {
      recipe: {},
      recipeID: null,
      recipeURL: null
    }

    this.handleRecipeLink = this.handleRecipeLink.bind(this);
    this.handleLink = this.handleLink.bind(this);

  }

  handleRecipeLink(recipe) {

    var win = window.open(recipe.url, '_blank');
    win.focus();

  }

  handleLink() {
    console.log("CLICKED!!")
  }


  render() {

    console.log("recipe:", this.props.recipes[0])

    return (

        this.props.recipes.map((recipe, index) => {
          return (
            <div className="recipe-container" target="_blank">
        
              <img src = {recipe.image} className="picture"/>
              
              <div className="content">


                <button 
                  className="recipe-button"
                  onClick={this.handleRecipeLink.bind(this,recipe)}
                >
                {recipe.title}
                </button>

                


              </div>
            </div>
          )
        }) 
    );
  }

}

export default Recipe;




