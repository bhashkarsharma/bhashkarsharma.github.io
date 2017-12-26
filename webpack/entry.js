import React from 'react';
import {render} from 'react-dom';
import Helvetica from './lab/Helvetica/Helvetica';
import Instagram from './Instagram/Instagram';
import Quote from './Quote/Quote';
import Segment from './lab/Segment/Segment';
import SetGame from './lab/Set/SetGame/SetGame';

if (document.getElementById('quote')) {
  render(<Quote />, document.getElementById('quote'));
}

if (document.getElementById('insta-box')) {
  render(<Instagram limit="8"/>, document.getElementById('insta-box'));
}

if (document.getElementById('helvetica')) {
  render(<Helvetica />, document.getElementById('helvetica'));
}

if (document.getElementById('segment')) {
  render(<Segment />, document.getElementById('segment'));
}

if (document.getElementById('set-game')) {
  render(<SetGame />, document.getElementById('set-game'));
}
