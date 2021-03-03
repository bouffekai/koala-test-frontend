import React from 'react';
import SpinningEarth from './spinning_earth.png';

class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return <img src={SpinningEarth} alt="" className="spinning-earth" />
    }
}

export default Loader;