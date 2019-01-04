import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {bubbleStyleHover, bubbleStyle} from './pinStyles.js';

const defaultPin = { 
  width: '0',
  height: '0',
  borderLeft: '10px solid transparent',
  borderRight: '10px solid transparent',
}

class Pin extends Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    $hover: PropTypes.bool
  };  

  constructor(props) {
    super(props);
    this.state = {
      name: PropTypes.string,
      price: PropTypes.string,
      style: defaultPin
    }   
  }

  componentDidMount(){
    this.checkPrice(this.props.price,this.props.budget);
    this.setState({name:this.props.name});
    this.setState({price:this.props.price});
  }


  componentDidUpdate(prevProps) {
    if (this.props.budget !== prevProps.budget) {
      this.checkPrice(this.props.price,this.props.budget);  
    }
    if (this.props.name !== prevProps.name) {
      this.setState({name:this.props.name});
      this.setState({price:this.props.price});
      this.checkPrice(this.props.price,this.props.budget);
    }
  }


  checkPrice(price,budget)
  {
    if(price===0)
    {

      this.setState({style : {
        ...defaultPin,
        borderTop: '20px solid grey'
      }})

    }
    else if(((price/budget)>1.5))
    {
      this.setState({style : {
        ...defaultPin,
        borderTop: '20px solid red'
      }})
    }
    else if(price<=budget)
    {
      this.setState({style : {
        ...defaultPin,
        borderTop: '20px solid green'
      }})
    }
    else 
    {
      this.setState({style : {
        ...defaultPin,
        borderTop: '20px solid yellow'
      }})
    }
  }

  render() {
    const pin = this.props.$hover ? {...this.state.style, transform: 'scale(1.25,1.25)'} : this.state.style;
    const bubble = this.props.$hover ? bubbleStyleHover : bubbleStyle;
    const blurb = this.state.name +'';
    const priceP = this.props.price===0 ? 'No price info' : '$'+this.state.price;

    return (
      <div style={pin} 
            lat={45.501690}
             lng={-73.567253} 
             budget={parseInt(this.props.budget,10)}
             price={parseInt(this.props.price,10)}>
        <div style={bubble}>
           <p>{blurb}</p>
           <p>{priceP}</p>
         </div>
      </div>
    );
  }
}

export default Pin;