import React, { Component } from 'react';

import './styles/home.css';

//Components
import Header from '../components/headerComponent/header2'; 
import Box from '../components/bodyComponent/box';
import Logo from '../components/bodyComponent/logo';

class Home extends Component {

  render() {
    return (
      <div className="App">

        <Header />
        <div>
        <div className="Container">
          <Logo />
        </div>
        </div>
        <div className="Container">

          <Box 
            className="left"
            title={"Eat In"}
            school={"UBC"}
            href={"eatIn"}
          />

          <Box 
            className="right"
            title={"Eat Out"}
            school={"McGill University"}
            href={"eatOut"}
          />
        </div>
      </div>
      
    );
  }
}

export default Home;
