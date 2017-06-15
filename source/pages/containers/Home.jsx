import React, { Component } from 'react'
import { Link } from 'react-router'

import api from '../../api.js'
import Post from '../../posts/containers/Post.jsx'
import Loading from '../../shared/components/Loading.jsx'

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      page : 1,
      post: [],
      loading: true
    }
    this.HandleScroll = this.HandleScroll.bind(this)
  }

  async componentDidMount(){
    const post = await api.post.getList(this.state.page)
    
    this.setState({
      page: this.state.page + 1,
      post,
      loading: false
    })
   window.addEventListener('scroll', this.HandleScroll)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.HandleScroll)
  }

  HandleScroll(event){
      if(this.state.loading) return null

      const scrolled = window.scrollY
      const viewportHeight = window.innerHeight
      const fullHeight = document.client.height

        if(!(scrolled + viewportHeight + 300 >= fullHeight) ){
          return false
        }
        this.setState({
          loading: true}, async () =>{
            try{
              const posts = await api.post.getList(this.state.pages)

              this.setState({
                page: this.state.page + 1, 
                posts: this.state.posts.concat(posts),
                loading: false

              })
            }catch (error){
              console.log(error)
              this.setState({loading: false})
            }
          })
  }
  render() {
    if(this.state.loading){
      return(
        <Loading />
      )
    }
    return (
      
      <section name="Home">
        <h1>Home</h1>
        <section>
           {this.state.post.map(post => <Post key={post.id} {...post}/>)}
        </section>
        <Link to="/about">
          Go to about
        </Link>
      </section>
    );
  }
}

export default Home;
