import React from 'react';
import {render} from 'react-dom';
import style from './Digilog.scss';
import Face from './Face/Face';

export default class Digilog extends React.Component {
    constructor() {
        super();
        this.state = {
            hh: 0,
            mm: 0,
            mode: 0,
            time: [0, 0, 0, 0, 0, 0]
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
        if (this.state.mode === 0) {
            const h = date.getHours();
            const m = date.getMinutes();
            const mm = 6 * m - 90;
            const hh = 0.5 * (60 * h + m) - 90;
            this.setState({ hh, mm });
        } else {
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
    }

    switchMode(mode) {
        this.setState({ mode });
    }

    render() {
        return (
            <div className="digilog">
                <div className="face-box">
                {
                    this.state.time.map((i, k) => {
                        return <Face mode={this.state.mode} hh={this.state.hh} mm={this.state.mm} val={i} key={k}></Face> 
                    })
                }
                </div>
                <div className="mode-selector">
                    <div>
                        <label className={this.state.mode === 0 ? 'chosen' : ''} onClick={this.switchMode.bind(this, 0)}>Analog</label>
                        {this.state.mode === 0 && <div className="fa-holder"><i className="fas fa-toggle-off fa-2x"></i></div>}
                        {this.state.mode === 1 && <div className="fa-holder"><i className="fas fa-toggle-on fa-2x"></i></div>}
                        <label className={this.state.mode === 1 ? 'chosen' : ''} onClick={this.switchMode.bind(this, 1)}>Digital</label>
                    </div>
                </div>
            </div>
        )
    }
}
