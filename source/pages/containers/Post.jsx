import React, { Component } from 'react';
import { Link } from 'react-router';
//components
import PostBody from '../../posts/containers/Post.jsx'
import Loading from '../../shared/components/Loading.jsx'
import Comment from '../../comments/components/Comment.jsx'
//services
import api from '../../api.js'

class Post extends Component {
  constructor(props){
    super(props)

    this.state = {
      loading:true,
      user:{},
      post:{},
      comments:[],
    };
  }

  async componentDidMount() {
    const [
      post,
      comments,
    ] = await Promise.all([
      api.post.getSingle(this.props.params.id),
      api.post.getComments(this.props.params.id)
    ])
    const user = await api.user.getSingle(post.userId);

    this.setState({
      loading: false,
      post,
      user,
      comments,
    })
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <section name="Post">
        <PostBody
          {...this.state.post}
          user={this.state.user}
          comments={this.state.comments}
        />
        <h1>comentarios</h1>
        {
          this.state.comments
          .map(comment => (<Comment key={comment.id} {...comment}/>))
        }
      </section>
    );
  }
}

export default Post;
