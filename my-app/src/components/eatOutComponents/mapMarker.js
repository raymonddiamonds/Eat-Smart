// import React, { Component } from 'react';

// class MapMarker extends Component {
//   constructor(props) {
//     super(props);   
//     this.state = {
//     }
//   }

//   render() {
//     return (
//       <div className="marker">
//         <p>Latitude: {this.props.latitude}</p>
//       </div>
//     );
//   }
// }

// export default MapMarker;

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './mapMarker.css';

export default class MapMarker extends Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    // to detect hover it uses internal mechanism, explained in x_distance_hover example
    $hover: PropTypes.bool,
    text: PropTypes.string
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    // const type = this.props.$hover ? "marker" : "markerHover";

    // return (
    //    <div className={type}>
    //       {this.props.text}
    //    </div>
    // );
  }
}