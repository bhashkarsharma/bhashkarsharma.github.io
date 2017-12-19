import React from 'react';
import {render} from 'react-dom';
import style from './Set.scss';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className={`card ${this.props.conf.color} ${this.props.conf.clicked ? 'clicked' : ''} ${this.props.conf.visual}`}
                onClick={this.props.onClick}>
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
        window.switchTheme('day', false);
        const colors = ['red', 'blue', 'green'];
        const count = [1, 2, 3];
        const shapes = ['round', 'square', 'triangle'];
        const fills = ['empty', 'shaded', 'filled'];
        let deck = [];

        colors.forEach(color => {
            count.forEach(count => {
                shapes.forEach(shape => {
                    fills.forEach(fill => {
                        deck.push({ color, count, shape, fill, clicked: false, visual: '' });
                    });
                });
            });
        });

        deck = this.shuffleArr(deck);
        
        this.state = {
            clicked: [],
            deck,
            hand: deck.splice(0, 16),
            hint: [],
            possible: 0,
            score: 0
        };
    }

    componentDidMount() {
        const hand = this.state.hand;
        this.setState({
            possible: this.getPossibleSets(hand)
        });
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
        return matchCount === 4;
    }

    win(arr) {
        let deck = this.state.deck;
        let hand = this.state.hand;
        let score = this.state.score;
        const idx = [];
        arr.forEach(i => {
            hand.forEach((j, k) => {
                if (i.color === j.color && i.count === j.count && i.fill === j.fill && i.shape === j.shape) {
                    idx.push(k);
                }
            });
        });
        idx.forEach(i => {
            if (deck.length > 0) {
                hand[i] = deck.splice(0, 1)[0];
            } else {
                hand.splice(i, 1);
            }
        });
        score += 10;
        this.setState({
            deck,
            hand,
            possible: this.getPossibleSets(hand),
            score
        });
    }

    cardClick(i, e) {
        const hand = this.state.hand;
        this.getCombinations(hand);
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
            this.setVisualState(clicked, this.checkSet(...clicked));
            hand.forEach(j => j.clicked = false);
        }
    }

    setVisualState(cards, success) {
        const hand = this.state.hand;
        const visualClass = success ? 'success' : 'error';
        const idx = [];
        cards.forEach(i => {
            hand.forEach((j, k) => {
                if (i.color === j.color && i.count === j.count 
                    && i.fill === j.fill && i.shape === j.shape) {
                    idx.push(k);
                    hand[k].visual = visualClass;
                }
            });
        });
        this.setState({ hand });
        setTimeout(() => {
            idx.forEach(i => {
                hand[i].visual = '';
            });
            this.setState({ hand, clicked: [] });
            if (success) this.win(cards);
        }, 1000);
    }

    getPossibleSets() {
        const hand = this.state.hand;
        let c = 0;
        this.getCombinations(hand).forEach(i => {
            const arr = i.map(j => hand[j]);
            if (this.checkSet(...arr)) {
                if (c === 0) {
                    this.setState({ hint: i });
                }
                c++;
            }
        });
        return c;
    }

    getCombinations(arr) {
        const l = arr.length;
        let idx = [];
        for (let i=0; i<l-2; i++) {
            for (let j=i+1; j<l-1; j++) {
                for (let k=j+1; k<l; k++) {
                    idx.push([i, j, k]);
                }
            }
        }
        return idx;
    }

    showHint() {
        const hand = this.state.hand;
        const hint = this.state.hint;
        if (hint.length > 0) {
            hint.forEach(i => {
                if (!hand[i].clicked) {
                    hand[i].visual = 'hint';
                }
            });
        } else {
            hand.forEach(i => i.visual = '');
        }
        this.setState({ hand });
        setTimeout(() => {
            hint.forEach(i => {
                hand[i].visual = '';
            });
            this.setState({ hand });
        }, 2000);
    }

    render() {
        return (
            <div className="set">
                <div className="stats">
                    <div>Possible sets: {this.state.possible}</div>
                    <div>Cards remaining: {this.state.deck.length}</div>
                </div>
                {
                    this.state.hand.map((i, k) => {
                        return <Card conf={i} key={k} onClick={this.cardClick.bind(this, i)}></Card>;
                    })
                }
                <div className="score">
                    <div>Your score: {this.state.score}</div>
                </div>
                <a href="javascript:void(0);" onClick={this.showHint.bind(this)}>Need a hint?</a>
                <div className="instructions">
                    <div>Select three cards. They must satisfy ALL of the following conditions:</div>
                    <ol>
                        <li>Same color OR all different colors</li>
                        <li>Same fill OR all different fills</li>
                        <li>Same shape OR all different shapes</li>
                        <li>Same number of items OR all different number of items</li>
                    </ol>
                </div>
            </div>
        )
    }
}
export default SetGame;
