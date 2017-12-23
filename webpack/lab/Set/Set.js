import React from 'react';
import {render} from 'react-dom';
import style from './Set.scss';
import Card from './Card';

class SetGame extends React.Component {
    constructor() {
        super();
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
            availablePoints: 0,
            clicked: [],
            deck,
            endTime: 0,
            hand: deck.splice(0, 16),
            hints: [],
            lastWin: 0,
            possible: 0,
            score: 0,
            startTime: 0,
            visualOn: false
        };
    }

    componentDidMount() {
        const hand = this.state.hand;
        this.setState({
            lastWin: new Date(),
            possible: this.getPossibleSets(hand),
            startTime: new Date()
        });
        this.interval = setInterval(() => {
            this.calculateAvailablePoints();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
                if (i.color === j.color && i.count === j.count
                    && i.fill === j.fill && i.shape === j.shape) {
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
        score += this.state.availablePoints;
        this.setState({
            deck,
            endTime: new Date(),
            hand,
            lastWin: new Date(),
            possible: this.getPossibleSets(hand),
            score
        });
    }

    calculateAvailablePoints() {
        const sec = Math.max(0, Math.floor((new Date() - this.state.lastWin) / 1000) - 10);
        const availablePoints = Math.max(1, 10 - Math.floor(sec/5));
        this.setState({ availablePoints });
    }

    cardClick(i, e) {
        const hand = this.state.hand;
        this.getCombinations(hand);
        hand.forEach((j, k) => {
            if (i.color === j.color && i.count === j.count && i.fill === j.fill && i.shape === j.shape) {
                j.clicked = !j.clicked;
            }
        });
        const clicked = [...new Set(hand.filter(j => j.clicked === true))];
        this.setState({ clicked, hand });
        if (clicked.length === 3) {
            this.setVisualState(clicked, this.checkSet(...clicked));
        }
    }

    setVisualState(cards, success) {
        const hand = this.state.hand;
        const visualClass = success ? 'success' : 'error';
        const timeOut = success ? 2000 : 1000;
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
        this.setState({ hand, visualOn: true });
        setTimeout(() => {
            idx.forEach(i => {
                hand[i].visual = '';
            });
            hand.forEach(j => j.clicked = false);
            this.setState({ hand, clicked: [], visualOn: false });
            if (success) {
                this.win(cards);
            }
        }, timeOut);
    }

    getPossibleSets() {
        const hand = this.state.hand;
        const hints = [];
        this.getCombinations(hand).forEach(i => {
            const arr = i.map(j => hand[j]);
            if (this.checkSet(...arr)) {
                hints.push(i);
            }
        });
        this.setState({ hints });
        return hints.length;
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
        const hint = this.state.hints[Math.floor(Math.random() * this.state.hints.length)];
        let score = this.state.score;
        if (hint.length > 0) {
            hint.forEach(i => {
                if (!hand[i].clicked) {
                    hand[i].visual = 'hint';
                }
            });
            score -= 5;
        } else {
            hand.forEach(i => i.visual = '');
        }
        this.setState({ hand, score });
        setTimeout(() => {
            hint.forEach(i => {
                hand[i].visual = '';
            });
            this.setState({ hand });
        }, 2000);
    }

    showTime() {
        let timeDiff = Math.floor((this.state.endTime - this.state.startTime) / 1000);
        const sec = timeDiff % 60;
        timeDiff -= sec;
        timeDiff /= 60;
        const mins = timeDiff % 60;
        timeDiff -= mins;
        timeDiff /= 60;
        return `${timeDiff ? timeDiff + ' hours' : '' }\
                    ${mins ? ' ' + mins + ' min' : ''}\
                    ${sec ? ' ' + sec + ' sec' : '' }`;
    }

    render() {
        return (
            <div className="set">
                {this.state.possible > 0 &&
                    <div className="stats">
                        <div>Possible sets: {this.state.possible}</div>
                        <div>Cards remaining: {this.state.deck.length}</div>
                        <progress className="gameTimer" value={this.state.availablePoints} max="10"></progress>
                    </div>
                }
                {this.state.possible > 0 ?
                    this.state.hand.map((i, k) => {
                        return <Card conf={i} key={k} onClick={this.cardClick.bind(this, i)}></Card>;
                    }) :
                    <div className="final-stats">
                        <div>Game Over</div>
                        <div>Score: {this.state.score}</div>
                        <div>Time Taken: {this.showTime()}</div>
                    </div>
                }
                {this.state.possible > 0 &&
                    <div>
                        <div className="score">
                            <div>Your score: {this.state.score}</div>
                        </div>
                        <a href="javascript:void(0);" onClick={this.showHint.bind(this)}>Need a hint?</a>
                    </div>
                }
                <div className="instructions">
                    <div>Select three cards. They must satisfy ALL of the following conditions:</div>
                    <ol>
                        <li>Same color OR all different colors</li>
                        <li>Same fill OR all different fills</li>
                        <li>Same shape OR all different shapes</li>
                        <li>Same number of items OR all different number of items</li>
                    </ol>
                    <div>Scoring:</div>
                    <ol>
                        <li>Each correct match: +10</li>
                        <li>Each hint: -5</li>
                    </ol>
                </div>
            </div>
        )
    }
}
export default SetGame;
