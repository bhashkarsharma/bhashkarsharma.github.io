import React from 'react';
import {render} from 'react-dom';
import style from './Digilog.scss';
import Face from './Face/Face';

class Digilog extends React.Component {
    constructor() {
        super();
        this.state = {
            faces: []
        };
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.tick();
        this.interval = setInterval(this.tick, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        const faces = [];
        const date = new Date();
        let time = [];
        [date.getHours(), date.getMinutes(), date.getSeconds()].forEach(i => {
            if (i >= 10) {
                time = time.concat(String(i).split(''));
            } else {
                time = time.concat(['0', String(i)]);
            }
        });
        this.setState({ faces });
    }

    render() {
        return (
            <div className="digilog">
            {
                this.state.faces.map((i, k) => {
                    return <Face val={i} idx={k} key={k}></Face> 
                })
            }
            </div>
        )
    }
}
export default Digilog;
