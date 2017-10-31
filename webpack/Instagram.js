import React from 'react';
import axios from 'axios';

class Instagram extends React.Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentDidMount() {
    const url = '/assets/posts.json';
    axios.get(url)
    .then(resp => {
        const data = resp.data.data;
        data.map(i => {
            i.caption.text = i.caption.text.replace(/#(\S*)/g,'<a href="https://instagram.com/explore/tags/$1">#$1</a>');
        });
        this.setState({ posts: data });
    });
  }

  getText(post) {
    return { __html: post.caption.text };
  }

  render() {
    return (
      <div className="insta-holder">
        {
            this.state.posts.map((i, key) => {
                return <a href={i.link} key={key}>
                    <div className="insta-item">
                        <img src={i.images.low_resolution.url} />
                        <div className="meta">
                            <span className="likes">
                                <i className="fa fa-heart" aria-hidden="true"></i> {i.likes.count}
                            </span>
                            <span className="caption" dangerouslySetInnerHTML={this.getText(i)}></span>
                        </div>
                    </div>
                </a>;
            })
        }
      </div>
    )
  }
}
export default Instagram;