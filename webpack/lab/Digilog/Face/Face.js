import React from 'react';
import {render} from 'react-dom';
import style from './Face.scss';

class Face extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`face ${this.props.shape}`}>
                <div className="hand mask"></div>
                <div className="hand"></div>
                <div className="hand"></div>
            </div>
        )
    }
}
export default Face;
