import React, { Component } from 'react';
import logoImg from './logo1.png';

class Canvas extends Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }
  
    componentDidUpdate() {
        const { angle } = this.props;
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        var logo = new Image();
        logo.src = logoImg;
        logo.onload = function() {
            ctx.save(); //save the default state
            ctx.clearRect(0, 0, width, height);
            ctx.translate(width / 2, height / 2);
            ctx.rotate((angle * Math.PI) / 180);
            ctx.drawImage(logo, -logo.width/2, -logo.height/2);
            ctx.restore(); //restore the default state so we can apply transformations as if to default
      }
    }
  
    render() {
      return <canvas width="335" height="335" ref={this.canvasRef} />;
    }
  }

export default Canvas;