import React from 'react';
import {render} from 'react-dom';
import style from './Face.scss';

class Face extends React.Component {
    constructor(props) {
        super(props);
        this.pattern = {
            0: [0, 2, 2, 4, 2, 6, 2, 6, 0, 6, 4, 6],
            1: [3, 3, 2, 2, 3, 3, 2, 6, 3, 3, 6, 6],
            2: [0, 0, 2, 4, 0, 2, 4, 6, 0, 6, 4, 4],
            3: [0, 0, 2, 4, 0, 0, 2, 6, 0, 0, 4, 6],
            4: [2, 2, 2, 2, 0, 6, 2, 6, 3, 3, 6, 6],
            5: [0, 2, 4, 4, 0, 6, 2, 4, 0, 0, 4, 6],
            6: [0, 2, 4, 4, 2, 6, 2, 4, 0, 6, 4, 6],
            7: [0, 0, 2, 4, 3, 3, 2, 6, 3, 3, 6, 6],
            8: [0, 2, 2, 4, 0, 6, 4, 6, 0, 6, 4, 6],
            9: [0, 2, 2, 4, 0, 6, 4, 6, 0, 0, 4, 6]
        };
    }

    render() {
        return (
            <div className={`face ${this.props.shape}`}>
            {
                [0, 1, 2, 3, 4, 5].map((i, k) => {
                    const trans1 = {
                        transform: `rotateZ(${this.props.mode ? this.pattern[this.props.val][2*i] * 45 : this.props.hh}deg)`
                    };
                    const trans2 = {
                        transform: `rotateZ(${this.props.mode ? this.pattern[this.props.val][2*i + 1] * 45: this.props.mm}deg)`
                    };
                    return <div key={k} className="node">
                        {this.props.mode ? <div className="hand mask"></div> : ''}
                        <div className="hand" style={trans1}></div>
                        <div className="hand" style={trans2}></div>
                    </div>
                })
            }
            </div>
        )
    }
}
export default Face;
