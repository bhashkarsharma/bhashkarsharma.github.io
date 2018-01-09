import React from 'react';
import {render} from 'react-dom';
import Collision from './lab/Collision/Collision';
import Digilog from './lab/Digilog/Digilog';
import Helvetica from './lab/Helvetica/Helvetica';
import Instagram from './Instagram/Instagram';
import ParticleClock from './lab/Particle/ParticleClock';
import Quote from './Quote/Quote';
import Segment from './lab/Segment/Segment';
import SetGame from './lab/Set/SetGame/SetGame';

if (document.getElementById('collision')) {
  render(<Collision />, document.getElementById('collision'));
}

if (document.getElementById('digilog')) {
  render(<Digilog />, document.getElementById('digilog'));
}

if (document.getElementById('helvetica')) {
  render(<Helvetica />, document.getElementById('helvetica'));
}

if (document.getElementById('insta-box')) {
  render(<Instagram limit="8"/>, document.getElementById('insta-box'));
}

if (document.getElementById('particle')) {
  render(<ParticleClock />, document.getElementById('particle'));
}

if (document.getElementById('quote')) {
  render(<Quote />, document.getElementById('quote'));
}

if (document.getElementById('segment')) {
  render(<Segment />, document.getElementById('segment'));
}

if (document.getElementById('set-game')) {
  render(<SetGame />, document.getElementById('set-game'));
}
