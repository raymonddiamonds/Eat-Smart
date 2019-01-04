import React, { Component } from 'react';
import './styles/box.css';

class Box extends Component {

	render() {

	  	console.log("Hello world " + this.props.title);
	  	console.log(this.props.school)

	    return (
	      <div className="Box">

	      	<button 
	      		className="button"
	      	>
	      		<a href={this.props.href} onClick="return false" className="anchor">{this.props.title}</a>
	      	</button>

	      </div>

	    );
	}
}

export default Box;