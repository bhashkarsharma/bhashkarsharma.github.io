import React from 'react';
import axios from 'axios';

class Quote extends React.Component {
  constructor() {
    super();
    this.state = { quote };
  }

  componentDidMount() {
    const url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
    axios.get(url)
    .then(resp => this.setState({ quote: resp.data[0] }));
  }

  getQuote() {
    return { __html: this.state.quote.content };
  }

  render() {
    return (
      <div>
        {this.state.quote.title.length > 0 &&
          <div>
            <i className="fa fa-quote-left" aria-hidden="true"></i>
            <span className="text" dangerouslySetInnerHTML={this.getQuote()}></span>
            <div className="author">&mdash; {this.state.quote.title}</div>
          </div>
        }
      </div>
    )
  }
}
export default Quote;