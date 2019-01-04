import React, { Component } from 'react';
import './styles/backButton.css';

class BackButton extends Component {

	render() {
	    return (
	      <div className="backButton">

	      	<button 
	      		className="button2"
	      	>
	      		<a href={this.props.href} onClick="return false" className="anchor2">{this.props.title}</a>
	      	</button>

	      </div>

	    );
	}
}

export default BackButton;