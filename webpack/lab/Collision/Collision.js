import React from 'react';
import { render } from 'react-dom';
import style from './Collision.scss';

export default class Collision extends React.Component {
    constructor() {
        super();
        this.state = {
            width: 500,
            height: 500
        };
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        console.log('resize', window.innerWidth);
    }

    render() {
        return (
            <div>
                <canvas width={this.state.width} height={this.state.height} ref={(can) => { this.canvas = can; }}></canvas>
            </div>
        )
    }
}
