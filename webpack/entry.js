import React from 'react';
import {render} from 'react-dom';
import Quote from './Quote';
import Instagram from './Instagram';
import Helvetica from './lab/Helvetica/Helvetica';
import SetGame from './lab/Set/SetGame/SetGame';

if (document.getElementById('quote')) {
  render(<Quote />, document.getElementById('quote'));
}

if (document.getElementById('insta-box')) {
  render(<Instagram />, document.getElementById('insta-box'));
}

if (document.getElementById('helvetica')) {
  render(<Helvetica />, document.getElementById('helvetica'));
}

if (document.getElementById('set-game')) {
  render(<SetGame />, document.getElementById('set-game'));
}
