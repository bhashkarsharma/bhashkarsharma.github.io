import React from 'react';
import {render} from 'react-dom';
import style from './Helvetica.scss';

class Helvetica extends React.Component {
    constructor() {
      super();
      const labels = [
        'ITLISASTIME',
        'ACQUARTERDC',
        'TWENTYFIVEX',
        'HALFBTENFTO',
        'PASTERUNINE',
        'ONESIXTHREE',
        'FOURFIVETWO',
        'EIGHTELEVEN',
        'SEVENTWELVE',
        'TENSEOCLOCK'
      ];
      this.state = {
        blink: labels.map(i => Array.from(i).map(j => 0)),
        labelArr: labels.map(i => Array.from(i)),
        labels: labels
      };
      this.tick = this.tick.bind(this);
    }

    getTimeString() {
      let timeString = ['IT', 'IS'];
      const numStrings = [
        'ZERO',
        'ONE',
        'TWO',
        'THREE',
        'FOUR',
        'FIVE',
        'SIX',
        'SEVEN',
        'EIGHT',
        'NINE',
        'TEN',
        'ELEVEN',
        'TWELVE'
      ];
      const vagueMinLabels = [
        '',
        'FIVE',
        'TEN',
        'QUARTER',
        'TWENTY',
        'TWENTYFIVE',
        'HALF'
      ];
      const date = new Date();
      const minutes = date.getMinutes();
      let hours = date.getHours();
      hours = hours % 12 || hours || 12;
      const roundedMins = Math.floor(minutes / 5) * 5;
      for (let i = 0; i < 7; i++) {
        if ([i * 5, 60 - (i * 5)].indexOf(roundedMins) !== -1) {
          timeString.push(vagueMinLabels[i]);
          break;
        }
      }
      if (roundedMins > 0) {
        if (roundedMins > 30) {
          timeString.push('TO');
          hours++;
          hours = hours % 12 || hours || 12;
        } else {
          timeString.push('PAST');
        }
      }
      timeString.push(numStrings[hours]);
      if (roundedMins === 0) {
        timeString.push('OCLOCK');
      }
      return timeString.filter(i => i !== '');
    }

    getBlinkState(labels, timeString) {
      const blinkState = labels.map(i => Array.from(i).map(j => 0));
      let startIndex = 0;
      const endIndex = labels.length;
      timeString.map(i => {
        for (let j = startIndex; j < endIndex; j++) {
          const idx = labels[j].indexOf(i);
          if (idx !== -1) {
            for (let k = 0; k < i.length; k++) {
              blinkState[j][idx + k] = 1;
            }
            startIndex = j;
            break;
          }
        }
      });
      return blinkState;
    }

    tick() {
      const timeString = this.getTimeString();
      this.setState({
        blink: this.getBlinkState(this.state.labels, timeString)
      });
      const date = new Date();
    }
  
    componentDidMount() {
      this.tick();
      this.interval = setInterval(this.tick, 5000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    render() {
      return (
        <div className="helvetica-clock">
          {
            this.state.labelArr.map((i, k) => {
              return <div className="row" key={k}>
              {
                i.map((j,l) => {
                  return <div className={"item " + (this.state.blink[k][l] ? 'on' : 'off' )} key={l}>{j}</div>;
                })
              }
              </div>;
            })
          }
        </div>
      )
    }
  }
  export default Helvetica;
