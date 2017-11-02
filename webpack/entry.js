import React from 'react';
import {render} from 'react-dom';
import Quote from './Quote';
import Instagram from './Instagram';

class QuoteApp extends React.Component {
  render() {
    return (
      <Quote />
    )
  }
}

if (document.getElementById('quote')) {
  render(<QuoteApp />, document.getElementById('quote'));
}

class IndexApp extends React.Component {
  render() {
    return (
      <Instagram />
    )
  }
}

if (document.getElementById('insta-box')) {
  render(<IndexApp />, document.getElementById('insta-box'));
}
