import React from 'react';
import {render} from 'react-dom';
import style from './Card.scss';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div
                    className={`inner ${this.props.conf.color} ${this.props.conf.clicked ? 'clicked' : ''} ${this.props.conf.visual}`}
                    onClick={this.props.onClick}>
                    {
                        Array.from(Array(this.props.conf.count).keys()).map((i, k) => {
                            return <div className={`icon ${this.props.conf.fill} ${this.props.conf.shape}`} key={k}></div>
                        })
                    }
                </div>
            </div>
        )
    }
}
