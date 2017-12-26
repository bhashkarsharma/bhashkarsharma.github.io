import React from 'react';
import axios from 'axios';
import style from './Instagram.scss';

class Instagram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedPosts: [],
            posts: []
        };
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        const url = '/assets/posts.json';
        axios.get(url)
            .then(resp => {
                const posts = resp.data.data;
                posts.map(i => {
                    i.caption.text = i.caption.text.replace(/#(\S*)/g, '<a href="https://instagram.com/explore/tags/$1">#$1</a>');
                });
                this.setState({ posts });
                this.tick();
            });
        this.interval = setInterval(this.tick, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    shuffleArr(a) {
        let c = a.length;
        while (c > 0) {
            const idx = Math.floor(Math.random() * c);
            c--;
            const tmp = a[c];
            a[c] = a[idx];
            a[idx] = tmp;
        }
        return a;
    }

    tick() {
        const displayedPosts = this.shuffleArr(this.state.posts).slice(0, this.props.limit);
        this.setState({ displayedPosts });
    }

    getText(post) {
        return { __html: post.caption.text };
    }

    render() {
        return (
            <div className="insta-holder">
                {
                    this.state.displayedPosts.map((i, key) => {
                        return <a href={i.link} key={key}>
                            <div className="insta-item">
                                <img src={i.images.low_resolution.url} />
                                <div className="meta">
                                    <span className="likes">
                                        <i className="fas fa-heart"></i> {i.likes.count} <i className="fas fa-comment"></i> {i.comments.count}
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