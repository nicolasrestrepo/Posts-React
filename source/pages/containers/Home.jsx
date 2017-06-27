import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import api from '../../api.js';
//components
import Post from '../../posts/containers/Post.jsx';
import Loading from '../../shared/components/Loading.jsx';
import Header from '../../shared/components/Header.jsx';
//redux
import { connect } from 'react-redux';
import actions from '../../actions';
import { bindActionCreators } from 'redux';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
    this.HandleScroll = this.HandleScroll.bind(this)
  }

  async componentDidMount() {
    this.InitialFetch();
    window.addEventListener('scroll', this.HandleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.HandleScroll)
  }

  async InitialFetch() {
    await this.props.actions.postNextPage();
    this.setState({ loading: false })
  }
  HandleScroll(event) {
    if (this.state.loading) return null

    const scrolled = window.scrollY
    const viewportHeight = window.innerHeight
    const fullHeight = document.documentElement.clientHeight

    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      console.log('null')
      return null
    }
    this.setState({ loading: true }, async () => {
      try {
        await this.props.actions.postNextPage();
        this.setState({ loading: false })
      } catch (error) {
        console.log('error', error)
        this.setState({ loading: false })
      }
    })
  }

  render() {
    return (
      <section name="Home">
        <Header />
        <section>
          {this.state.loading && (
            <Loading />
          )}
          {this.props.posts.map(post => <Post key={post.id} {...post} />)}
        </section>
        <Link to="/about">
          Go to about
        </Link>
      </section>
    );
  }
}

Home.PropTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  posts: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number
}

function mapStateToProps(state, props) {
  return {
    posts: state.posts.entities,
    page: state.posts.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
