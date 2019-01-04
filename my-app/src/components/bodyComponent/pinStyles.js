const pinStyle = { 
    width: '0',
    height: '0',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: '20px solid green'
}

const pinStyleRed = { 
    ...pinStyle,
    borderTop: '20px solid red'
}

const pinStyleYellow = { 
    ...pinStyle,
    borderTop: '20px solid yellow'
}

const pinStyleHover = { 
    ...pinStyle, 
    borderTop: '20px solid black',
    color: 'white'
}

const bubbleStyleHover = { 
    // talk-bubble
    margin: '-5px',
    display: 'inline-block',
    position: 'relative',
	width: '70px',
	height: 'auto',
    backgroundColor: '#9DB5B2',
    //border
    border: '2px solid #FFFFFF',
    //round
    borderRadius: '20px',
    zIndex: '10'
}

const bubbleStyle = { 
    ...bubbleStyleHover,
    visibility: 'hidden'
}

export {pinStyle, pinStyleRed, pinStyleYellow, pinStyleHover, bubbleStyleHover, bubbleStyle};