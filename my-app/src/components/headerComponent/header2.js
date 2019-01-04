import React, { Component } from 'react';
import './header.css';
import BackButton from '../bodyComponent/backButton';
import mainLogo from'./hamburger.png';


class Header extends Component {
  render() {
    return (
    	<div>
      <header className="Header">
      	<div className="float-div2">
      	<img src={mainLogo} className="imgS"/>
      	<h2 className="float-text">EAT SMART</h2>
      	</div>

      </header>
      </div>

    );
  }
}

export default Header;