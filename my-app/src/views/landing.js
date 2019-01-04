import React, { Component } from 'react';

import './styles/landing.css';

//Components
import Header from '../components/headerComponent/header2'; 
import Box from '../components/bodyComponent/box';

import Logo from '../components/bodyComponent/logo';


class Landing extends Component {
  
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="Container">
          <Logo />
        </div>
        <div className="Container">
            <Box 
                className="left"
                title={"Login"}
                href={"login"}
            />

            <Box 
                className="right"
                title={"Sign Up"}
                href={"signup"}
            />
        </div>
      </div>
      
    );
  }
}

export default Landing;
