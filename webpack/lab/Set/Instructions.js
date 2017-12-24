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
                <div>Select three cards. They must satisfy ALL of the following conditions:</div>
                <ol>
                    <li>Same color OR all different colors</li>
                    <li>Same fill OR all different fills</li>
                    <li>Same shape OR all different shapes</li>
                    <li>Same number of items OR all different number of items</li>
                </ol>
                <div>Scoring:</div>
                <ol>
                    <li>Correct match:</li>
                    <ol>
                        <li>Relaxed: +10</li>
                        <li>Timed: +5 + bonus (1-10 depending on time)</li>
                    </ol>
                    <li>Incorrect match: 0</li>
                    <li>Hint: -5 (Click on <i className="fa fa-question-circle" aria-hidden="true"></i> for hint)</li>
                </ol>
            </div>
        )
    }
}
export default Instructions;
