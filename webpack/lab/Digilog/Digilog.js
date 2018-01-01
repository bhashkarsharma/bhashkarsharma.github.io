import React from 'react';
import {render} from 'react-dom';
import style from './Digilog.scss';
import Face from './Face/Face';

class Digilog extends React.Component {
    constructor() {
        super();
        this.state = {
            time: []
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
            <div className="digilog">
            {
                this.state.time.map((i, k) => {
                    return <Face val={i} idx={k} key={k}></Face> 
                })
            }
            </div>
        )
    }
}
export default Digilog;
