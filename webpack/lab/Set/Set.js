import React from 'react';
import {render} from 'react-dom';
import style from './Set.scss';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`card ${this.props.conf.color} ${this.props.conf.clicked ? 'clicked' : '' }`} onClick={this.props.onClick}>
            {
                Array.from(Array(this.props.conf.count).keys()).map((i, k) => {
                    return <div className={`icon ${this.props.conf.fill} ${this.props.conf.shape}`} key={k}></div>
                })
            }
            </div>
        )
    }
}

class SetGame extends React.Component {
    constructor() {
        super();
        window.switchTheme('day');
        const colors = ['red', 'blue', 'green'];
        const count = [1, 2, 3];
        const shapes = ['round', 'square', 'triangle'];
        const fills = ['empty', 'shaded', 'filled'];
        let deck = [];

        colors.forEach(color => {
            count.forEach(count => {
                shapes.forEach(shape => {
                    fills.forEach(fill => {
                        deck.push({ color, count, shape, fill, clicked: false });
                    });
                });
            });
        });

        deck = this.shuffleArr(deck);
        
        this.state = {
            deck,
            hand: deck.splice(0, 12),
            clicked: [],
            score: 0
        };
    }

    shuffleArr(a) {
        let c = a.length;
        while (c > 0) {
            const idx = Math.floor(Math.random() * c);
            c--;
            const tmp = a[c];
            a[c] = a[idx];
            a[idx] = tmp;
        }
        return a;
    }

    checkSet(a, b, c) {
        const props = ['color', 'count', 'fill', 'shape'];
        let matchCount = 0;
        props.forEach(i => {
            const s = new Set([a[i], b[i], c[i]]);
            if ([1, 3].indexOf(s.size) > -1) matchCount++;
        });
        if (matchCount === 2) {
            return this.win([a, b, c]);
        } else {
            return false;
        }
    }

    win(arr) {
        let deck = this.state.deck;
        let hand = this.state.hand;
        let score = this.state.score;
        let idx = [];
        arr.forEach(i => {
            hand.forEach((j, k) => {
                if (i.color === j.color && i.count === j.count && i.fill === j.fill && i.shape === j.shape) {
                    idx.push(k);
                }
            });
        });
        idx.forEach(i => {
            const item = deck.splice(0, 1);
            hand[i] = item[0];
        });
        score++;
        this.setState({
            deck,
            hand,
            score
        });
    }

    cardClick(i, e) {
        const hand = this.state.hand;
        let clicked = this.state.clicked;
        clicked.push(i);
        clicked = [...new Set(clicked)];
        this.setState({
            clicked
        })
        hand.forEach((j, k) => {
            if (i.color === j.color && i.count === j.count && i.fill === j.fill && i.shape === j.shape) {
                j.clicked = !j.clicked;
            }
        });
        if (clicked.length === 3) {
            this.checkSet(...clicked);
            this.setState({ clicked: [] });
            hand.forEach(j => j.clicked = false);
        }
    }

    render() {
        return (
            <div className="set">
                {
                    this.state.hand.map((i, k) => {
                        return <Card conf={i} key={k} onClick={this.cardClick.bind(this, i)}></Card>;
                    })
                }
                <div className="score">Your score: {this.state.score}</div>
                <div className="score">Cards remaining: {this.state.deck.length}</div>
            </div>
        )
    }
}
export default SetGame;