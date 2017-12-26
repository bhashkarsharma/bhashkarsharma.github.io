import React from 'react';
import {render} from 'react-dom';
import style from './SetGame.scss';
import Game from '../Game/Game';
import Instructions from '../Instructions/Instructions';

class SetGame extends React.Component {
    constructor() {
        super();
        this.state = {
            difficulty: 0,
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
                            <div>
                                <label className={this.state.difficulty === 0 ? 'chosen' : ''} onClick={this.difficultyClick.bind(this, 0)}>Easy</label>
                                {this.state.difficulty === 0 && <div className="fa-holder"><i className="fas fa-toggle-off fa-2x"></i></div>}
                                {this.state.difficulty === 1 && <div className="fa-holder"><i className="fas fa-toggle-on fa-2x"></i></div>}
                                <label className={this.state.difficulty === 1 ? 'chosen' : ''} onClick={this.difficultyClick.bind(this, 1)}>Medium</label>
                            </div>
                        </div>
                        <div className="conf">
                            <div>
                                <label className={this.state.timed ? '' : 'chosen'} onClick={this.timedClick.bind(this, false)}>Relaxed</label>
                                {!this.state.timed && <div className="fa-holder"><i className="fas fa-toggle-off fa-2x"></i></div>}
                                {this.state.timed && <div className="fa-holder"><i className="fas fa-toggle-on fa-2x"></i></div>}
                                <label className={this.state.timed ? 'chosen' : ''} onClick={this.timedClick.bind(this, true)}>Timed</label>
                            </div>
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
