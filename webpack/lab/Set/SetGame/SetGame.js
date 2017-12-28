import React from 'react';
import {render} from 'react-dom';
import style from './SetGame.scss';
import Game from '../Game/Game';
import Instructions from '../Instructions/Instructions';

class SetGame extends React.Component {
    constructor() {
        super();
        this.cookieName = 'visited';
        this.state = {
            difficulty: 0,
            visited: SiteConf.getCookie(this.cookieName, '0'),
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

    onContinue() {
        SiteConf.setCookie(this.cookieName, '1');
        this.setState({
            visited: '1'
        });
    }

    render() {
        return (
            <div className="setbox">
                {this.state.visited === '0' ?
                    <Instructions onContinue={this.onContinue.bind(this)}></Instructions> :
                    <div>
                        {this.state.running ?
                            <Game difficulty={this.state.difficulty}
                                timed={this.state.timed}
                                endGame={this.endGame.bind(this)}>
                            </Game> :
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
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}
export default SetGame;
