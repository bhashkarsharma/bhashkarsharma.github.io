import React from 'react';
import {render} from 'react-dom';
import style from './Segment.scss';
import Digit from './Digit/Digit';

class Segment extends React.Component {
    constructor() {
        super();
        this.state = {
            time: ['0', '0', '0', '0', '0', '0']
        };
        this.tick = this.tick.bind(this);
    }
  
    componentDidMount() {
        this.tick();
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        const date = new Date();
        let time = [];
        [date.getHours(), date.getMinutes(), date.getSeconds()].forEach(i => {
            if (i >= 10) {
                time = time.concat(String(i).split(''));
            } else {
                time = time.concat(['0', String(i)]);
            }
        });
        this.setState({ time });
    }
  
    render() {
        return (
            <div className="segment-clock">
            {
                this.state.time.map((i, k) => {
                    return <Digit key={k} val={i}></Digit>
                })
            }
            </div>
        )
    }
}
export default Segment;
