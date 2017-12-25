import React from 'react';
import {render} from 'react-dom';
import style from './Game.scss';
import Card from '../Card/Card';
import Leaderboard from '../Leaderboard/Leaderboard';

/** 
 * Game states: 0 - finished, 1 - running
 * Difficulty: 0 - easy, 1 - medium
 * DrawCount: 12 or 15
 * Timed: True or False
*/

class Game extends React.Component {
    constructor(props) {
        super(props);
        const colors = ['red', 'blue', 'green'];
        const count = props.difficulty === 1 ? [1, 2, 3] : [1];
        const shapes = ['round', 'square', 'triangle'];
        const fills = ['empty', 'shaded', 'filled'];
        let deck = [];
        const drawCount = props.difficulty === 1 ?  12 : 9;

        colors.forEach(color => {
            count.forEach(count => {
                shapes.forEach(shape => {
                    fills.forEach(fill => {
                        deck.push({ color, count, shape, fill, clicked: false, visual: '' });
                    });
                });
            });
        });

        this.state = {
            availablePoints: 10,
            clicked: [],
            deck,
            drawCount,
            drawSize: drawCount,
            endTime: 0,
            hand: [],
            hints: [],
            hintCount: 0,
            lastWin: 0,
            mode: 1,
            possible: 0,
            progressWidth: 100,
            score: 0,
            startTime: 0,
            visualOn: false
        };
    }

    componentDidMount() {
        const drawCount = this.state.drawCount;
        let deck = this.state.deck;
        let hand = this.state.hand;
        let possible = this.state.possible;
        do {
            deck = this.shuffleArr(deck);
            hand = deck.slice(0, drawCount);
            possible = this.getPossibleSets(hand);
        } while (possible === 0);
        
        hand = deck.splice(0, drawCount);

        this.setState({
            deck,
            hand,
            lastWin: new Date(),
            possible,
            startTime: new Date()
        });

        if (this.props.timed) {
            this.interval = setInterval(() => {
                this.calculateAvailablePoints();
            }, 1000);
        }
    }

    componentWillUnmount() {
        if (this.props.timed) {
            clearInterval(this.interval);
        }
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
        let drawCount = this.state.drawCount;
        const drawSize = this.state.drawSize;
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
        idx.reverse().forEach(i => {
            if (deck.length > 0 && drawCount === drawSize) {
                hand[i] = deck.splice(0, 1)[0];
            } else {
                hand.splice(i, 1);
                drawCount--;
            }
        });
        score += this.state.availablePoints;
        let possible = this.getPossibleSets(hand);
        if (possible === 0 && drawCount === drawSize) {
            [0, 1, 2].forEach(i => {
                if (deck.length > 0) {
                    hand.push(deck.splice(0, 1)[0]);
                    drawCount++;
                }
            });
            possible = this.getPossibleSets(hand);
        }
        this.setState({
            deck,
            drawCount,
            endTime: new Date(),
            hand,
            lastWin: new Date(),
            possible,
            score
        });
    }

    calculateAvailablePoints() {
        if (this.props.timed) {
            const sec = Math.max(0, Math.floor((new Date() - this.state.lastWin) / 1000) - 5);
            const availablePoints = 5 + Math.max(0, 10 - Math.floor(sec/5));
            const progressWidth = (50 - sec) * 2;
            this.setState({ availablePoints, progressWidth });
        } else {
            this.setState({ availablePoints: 10, progressWidth: 100 });
        }
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

    getPossibleSets(hand) {
        const cards = hand || this.state.hand;
        const hints = [];
        this.getCombinations(cards).forEach(i => {
            const arr = i.map(j => cards[j]);
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
        if (hint) {
            hint.forEach(i => {
                if (!hand[i].clicked) {
                    hand[i].visual = 'hint';
                }
            });
            score -= 5;
        } else {
            hand.forEach(i => i.visual = '');
        }
        this.setState({ hand, score, hintCount: this.state.hintCount + 1 });
        if (hint) {
            setTimeout(() => {
                hint.forEach(i => {
                    hand[i].visual = '';
                });
                this.setState({ hand });
            }, 2000);
        }
    }

    timeTaken() {
        return this.props.timed ? Math.floor((this.state.endTime - this.state.startTime) / 1000) : 0;
    }

    showTime() {
        if (!this.props.timed) return '';
        let timeDiff = this.timeTaken();
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
            <div className={`set ${this.props.difficulty === 0 ? 'easy' : 'medium'}`}>
                {(this.state.deck.length > 0 || this.state.possible > 0) &&
                    <div className="stats">
                        <div>
                            <a href="javascript:void(0);" onClick={this.showHint.bind(this)}>
                                <i className="fa fa-question-circle" aria-hidden="true"></i>
                            </a>
                            {this.state.possible}
                        </div>
                        <div>
                            <i className="fa fa-th" aria-hidden="true"></i>
                            {this.state.deck.length}
                        </div>
                        <div>
                            <i className="fa fa-gamepad" aria-hidden="true"></i>
                            {this.state.score}
                        </div>
                        {this.props.timed && 
                            <progress className="gameTimer" value={this.state.progressWidth} max="100"></progress>
                        }
                    </div>
                }
                {(this.state.deck.length > 0 || this.state.possible > 0) ?
                    this.state.hand.map((i, k) => {
                        return <Card conf={i} key={k} onClick={this.cardClick.bind(this, i)}></Card>;
                    }) :
                    <div className="final-stats">
                        <div className="over">Game Over</div>
                        <div>Score: {this.state.score}</div>
                        {this.props.timed && <div>Time Taken: {this.showTime()}</div>}
                        <Leaderboard
                            score={this.state.score}
                            hints={this.state.hintCount}
                            time={this.timeTaken()}>
                        </Leaderboard>
                        <div>
                            <button onClick={this.props.endGame}>New Game</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default Game;
