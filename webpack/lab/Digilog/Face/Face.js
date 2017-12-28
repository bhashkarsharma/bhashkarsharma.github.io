import React from 'react';
import {render} from 'react-dom';
import style from './Face.scss';

class Face extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="face"></div>
        )
    }
}
export default Face;
