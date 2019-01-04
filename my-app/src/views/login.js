import './styles/login.css';
import Header from '../components/headerComponent/header2'; 

import React, { Component } from 'react';
import {
  BrowserRouter as 
  Router,
  Redirect,
  Route,
  Link,
  withRouter
} from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username : '',
      password: '',
      redirect: false
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/authenticate/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        //this.props.history.push('/home');
        //var Router = require('react-router');
        //Router.browserHistory.push('/home');
        console.log("hello world")
        console.log(res);
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).then(response=>
    {
      console.log(response);
      console.log('worked');
      this.setState({redirect: true});
      this.props.callback(response.id);
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
    
      if(!this.state.redirect) {
        return (



          <div className="container">

            <Header/>
            <div className="formbox">
              <form onSubmit={this.onSubmit} className="formStyle">
                <h1 className="fontStyling">Login Below!</h1>

                <div className="credentials">
                  <h5 className="smallText">username:</h5>
                  <input
                    className="inputField"
                    type="username"
                    name="username"
                    placeholder="Enter username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                <div className="credentials">
                  <h5 className="smallText">password</h5>
                  <input
                    className="inputField"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

               <div className="credentials">
                 <input type="submit" value="Submit" className="submitB"/>
               </div>
              </form>
            </div>
          </div>
        );
      } else {
        console.log('going back');
        return(
          <Redirect to='/home'/>
        );

      } 
  }
}
