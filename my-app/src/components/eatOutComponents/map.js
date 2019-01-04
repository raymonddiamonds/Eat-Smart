/*
 * Base Google Map example
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

//import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
import MyGreatPlaceWithHover from './mgpwh.js';

import {K_SIZE} from './mgpwh_styles.js';

export default class Map extends Component {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };

  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  };

  //shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    return (
       <GoogleMap
        apiKey={"AIzaSyCGpT0dJD2ojaGOx_bVq20bIqNt8ggHkYU"} // set if you need stats etc ...
        center={this.props.center}
        zoom={this.props.zoom}
        // instead of css hover (which sometimes is bad for map markers) (bad means inability to hover on markers placed under other markers)
        // you can use internal GoogleMap component hover algorithm
        // hover algorithm explained at x_distance_hover example
        hoverDistance={K_SIZE / 2}
        >
        <MyGreatPlaceWithHover lat={59.955413} lng={30.337844} /* Kreyser Avrora */ />
        <MyGreatPlaceWithHover {...this.props.greatPlaceCoords} /* road circle */ />
      </GoogleMap>
    );
  }
}