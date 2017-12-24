import React from 'react';
import {render} from 'react-dom';
import style from './Leaderboard.scss';
import Fire from '../firebase/Fire';

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            top: [],
            saved: false
        };
    }

    componentDidMount() {
        this.scoreDB = Fire.database().ref('leaderboard');
        this.scorelistRef = this.scoreDB.child('scoreList');
        this.highestScoreRef = this.scoreDB.child('highestScore');

        const scoreList = this.scorelistRef.limitToLast(10);
        scoreList.once('value', snap => {
            const val = snap.val();
            const top = [];
            Object.keys(val).map(i => {
                top.push(val[i]);
            });
            top.sort((a, b) => b.score - a.score);
            this.setState({ top });
        });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    saveScore() {
        const name = this.state.name;
        const score = this.props.score;
        if (name.length > 0) {
            const userScoreRef = this.scorelistRef.child(name);
            userScoreRef.setWithPriority({ name, score }, score);

            this.highestScoreRef.transaction((currHigh) => {
                if (currHigh === null || score > currHigh) {
                    return score;
                }
                return;
            });

            const scoreList = this.scorelistRef.limitToLast(10);
            scoreList.once('value', snap => {
                const val = snap.val();
                const top = [];
                Object.keys(val).map(i => {
                    top.push(val[i]);
                });
                top.sort((a, b) => b.score - a.score);
                this.setState({ top });
            });

            this.setState({ saved: true });
        }
    }

    render() {
        return (
            <div className="leaderboard">
                {!this.state.saved ?
                    <div className="scoreForm">
                        <input
                            type="text"
                            placeholder="Name"
                            maxLength="20"
                            value={this.state.name}
                            onChange={this.handleNameChange.bind(this)} />
                        <button onClick={this.saveScore.bind(this)}>Save</button>
                    </div> :
                    <table className="scoreboard">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.top.map((i, k) => {
                                return <tr key={k}><td>{i.name}</td><td>{i.score}</td></tr>;
                            })
                        }
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}
export default Leaderboard;
