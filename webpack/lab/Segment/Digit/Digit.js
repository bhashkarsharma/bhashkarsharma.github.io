import React from 'react';
import {render} from 'react-dom';
import style from './Digit.scss';

class Digit extends React.Component {
    constructor(props) {
        super(props);
        this.pattern = {
            0: [4, 2, 0, 2, 4, 2, 0, 6, 4, 6, 6, 0],
            1: [4, 2, 0, 1, 5, 2, 0, 6, 0, 2, 6, 0],
            2: [4, 2, 0, 2, 2, 2, 1, 6, 5, 6, 6, 0],
            3: [4, 2, 1, 2, 5, 6, 1, 6, 5, 0, 6, 0],
            4: [4, 2, 1, 0, 5, 6, 0, 6, 2, 0, 6, 0],
            5: [4, 2, 2, 6, 4, 6, 0, 2, 2, 0, 6, 2],
            6: [4, 2, 1, 6, 5, 6, 0, 2, 4, 6, 6, 2],
            7: [4, 2, 1, 2, 5, 0, 6, 6, 2, 0, 6, 0],
            8: [0, 6, 0, 2, 6, 0, 0, 6, 2, 6, 6, 0],
            9: [0, 6, 0, 2, 6, 2, 1, 2, 2, 5, 6, 0]
        };
    }

    render() {
        return (
            <div className="digit">
            {
                [0, 1, 2, 3, 4, 5].map((i, k) => {
                    const trans1 = {
                        transform: `rotateZ(${this.pattern[this.props.val][2*i] * 45}deg)`
                    };
                    const trans2 = {
                        transform: `rotateZ(${this.pattern[this.props.val][2*i + 1] * 45}deg)`
                    };
                    return <div key={k} className="node">
                        <div className="edge" style={trans1}></div>
                        <div className="edge" style={trans2}></div>
                        <div className="knob">
                            <div className="inner"></div>
                        </div>
                    </div>
                })
            }
            </div>
        )
    }
}
export default Digit;