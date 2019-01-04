const K_SIZE = 40;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  // position: 'absolute',
  // width: K_SIZE,
  // height: K_SIZE,
  // left: -K_SIZE / 2,
  // top: -K_SIZE / 2,

  // border: '5px solid #f44336',
  // borderRadius: K_SIZE,
  // backgroundColor: 'white',
  // textAlign: 'center',
  // color: '#3f51b5',
  // fontSize: 16,
  // fontWeight: 'bold',
  // padding: 4,
  // cursor: 'pointer'
  width: '0',
  height: '0',
  borderLeft: '10px solid transparent',
  borderRight: '10px solid transparent',
  borderTop: '20px solid green'
};

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  borderTop: '20px solid red'
};

export {greatPlaceStyle, greatPlaceStyleHover, K_SIZE};