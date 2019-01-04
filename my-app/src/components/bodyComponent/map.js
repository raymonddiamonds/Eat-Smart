import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Pin from '../bodyComponent/pin';
//import Marker from './Marker';

class Map extends Component {


  static defaultProps = {
    center: {
      lat: 45.501690,
      lng: -73.567253
    },
    zoom: 15
  };

 checkBudget(price, budget)
    {
      if(price<=budget)
      {
        return 'low';
      }
      else
      {
        if(budget/price>1.5)
        {
            return 'high';
        }
        else
        {
          return 'med';
        }
      }
    }

  _onBoundsChange = (centr, zoom /* , bounds, marginBounds */) => {
    //console.log(centr);
    this.props.callback(centr);
    this.setState({center:centr});
    
  }

  render(props) {
     const Pins = this.props.pins.map((pin, index) => (
        <Pin
          // required props
          key={index} //when creating a list all elements should have keys, index is okay but not encouraged
          lat={pin.lat}
          lng={pin.lng}
          name={pin.name}
          price={pin.price}
          budget={pin.budget}
          pin={pin}
          onBoundsChange={pin.onBoundsChange} />
      ));

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCGpT0dJD2ojaGOx_bVq20bIqNt8ggHkYU" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onBoundsChange={this._onBoundsChange}
          id='map'
          hoverDistance={40}
        >
          {Pins}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;