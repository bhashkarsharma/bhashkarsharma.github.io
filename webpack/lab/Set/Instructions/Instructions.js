import React from 'react';
import {render} from 'react-dom';
import style from './Instructions.scss';
import Card from '../Card/Card';

class Instructions extends React.Component {
    constructor() {
        super();
        this.state = {
            cards: [
                { color: 'red', count: 2, fill: 'filled', shape: 'triangle' },
                { color: 'green', count: 2, fill: 'filled', shape: 'triangle' },
                { color: 'blue', count: 2, fill: 'filled', shape: 'triangle' },
                { color: 'blue', count: 2, fill: 'filled', shape: 'round' },
                { color: 'red', count: 1, fill: 'shaded', shape: 'square' },
                { color: 'green', count: 3, fill: 'empty', shape: 'triangle' },
                { color: 'blue', count: 2, fill: 'empty', shape: 'square' },
                { color: 'red', count: 1, fill: 'shaded', shape: 'triangle' },
                { color: 'green', count: 3, fill: 'empty', shape: 'round' }
            ]
        };
    }

    render() {
        return (
            <div className="instructions">
                <h2>Instructions</h2>
                <div className="demo">
                    <div className="set medium">
                        <div className="stats">
                            <div>
                                <a className="desc">Possible moves</a>
                                <div className="fa-holder"><i className="fas fa-gamepad"></i></div>
                                2
                            </div>
                            <div>
                                <a className="desc">Remaining cards</a>
                                <div className="fa-holder"><i className="fas fa-th"></i></div>
                                28
                            </div>
                            <div>
                                <a className="desc">Score</a>
                                <div className="fa-holder"><i className="fas fa-trophy"></i></div>
                                10
                            </div>
                            <a className="desc">Bonus points remaining (timed mode)</a>
                            <progress className="gameTimer" value="60" max="100"></progress>
                        </div>
                        <div className="playpen">
                            <div className="cards">
                                {this.state.cards.map((i, k) => {
                                        return <div key={k} className="cardbox">
                                            <Card conf={i}></Card>
                                        </div>;
                                    })
                                }
                            </div>
                        </div>
                        <div className="stats">
                            <div>
                                <a href="javascript:void(0);">
                                    <div className="fa-holder"><i className="fas fa-question-circle"></i></div>
                                </a>
                                <a className="desc">Hint</a>
                            </div>
                            <div></div>
                            <div>
                                <a href="javascript:void(0);">
                                    <div className="fa-holder"><i className="fas fa-random"></i></div>
                                </a>
                                <a className="desc">Shuffle</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text">
                    {/* <h3>Instructions</h3>
                    <div>Select three cards. They must satisfy ALL of the following conditions:</div>
                    <ol>
                        <li>Same color OR all different colors</li>
                        <li>Same fill OR all different fills</li>
                        <li>Same shape OR all different shapes</li>
                        <li>Same number of items OR all different number of items</li>
                    </ol>
                    <div>Scoring:</div> */}
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Timed</th>
                                <th>Relaxed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Correct</td>
                                <td>+5 + bonus</td>
                                <td>+10</td>
                            </tr>
                            <tr>
                                <td>Hint</td>
                                <td>-5</td>
                                <td>-5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={this.props.onContinue}>Continue</button>
            </div>
        )
    }
}
export default Instructions;
