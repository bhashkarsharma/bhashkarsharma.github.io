import React from 'react';
import {render} from 'react-dom';
import style from './Instructions.scss';

class Instructions extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="instructions">
                <h3>Instructions</h3>
                <div>Select three cards. They must satisfy ALL of the following conditions:</div>
                <ol>
                    <li>Same color OR all different colors</li>
                    <li>Same fill OR all different fills</li>
                    <li>Same shape OR all different shapes</li>
                    <li>Same number of items OR all different number of items</li>
                </ol>
                <div>Scoring:</div>
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
                            <td>Incorrect</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Hint <i className="fa fa-question-circle" aria-hidden="true"></i></td>
                            <td>-5</td>
                            <td>-5</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Instructions;
