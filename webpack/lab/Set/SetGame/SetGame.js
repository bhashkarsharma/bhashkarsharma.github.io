import React from 'react';
import {render} from 'react-dom';
import style from './SetGame.scss';
import Game from '../Game/Game';
import Instructions from '../Instructions/Instructions';

class SetGame extends React.Component {
    constructor() {
        super();
        this.state = {
            difficulty: 1,
            running: false,
            timed: false
        };
    }

    difficultyClick(difficulty) {
        this.setState({ difficulty });
    }

    timedClick(timed) {
        this.setState({ timed });
    }

    startGame() {
        this.setState({ running: true });
    }

    endGame() {
        this.setState({ running: false });
    }

    render() {
        return (
            <div className="set">
                {!this.state.running ?
                    <div className="options">
                        <div className="conf">
                            <div className="choice">Difficulty</div>
                            <a className={this.state.difficulty === 0 ? 'chosen' : ''} href="javascript:void(0)" onClick={this.difficultyClick.bind(this, 0)}>Easy</a>
                            <a className={this.state.difficulty === 1 ? 'chosen' : ''} href="javascript:void(0)" onClick={this.difficultyClick.bind(this, 1)}>Medium</a>
                        </div>
                        <div className="conf">
                            <div className="choice">Mode</div>
                            <a className={this.state.timed ? '' : 'chosen'} href="javascript:void(0)" onClick={this.timedClick.bind(this, false)}>Relaxed</a>
                            <a className={this.state.timed ? 'chosen' : ''} href="javascript:void(0)" onClick={this.timedClick.bind(this, true)}>Timed</a>
                        </div>
                        <div>
                            <button onClick={this.startGame.bind(this)}>Start Game</button>
                        </div>
                    </div> :
                    <Game difficulty={this.state.difficulty}
                        timed={this.state.timed}
                        endGame={this.endGame.bind(this)}>
                    </Game>
                }
                <Instructions></Instructions>
            </div>
        )
    }
}
export default SetGame;
