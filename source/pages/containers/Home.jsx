import React, { Component } from 'react'
import { Link } from 'react-router'
import api from '../../api.js'
//components
import Post from '../../posts/containers/Post.jsx'
import Loading from '../../shared/components/Loading.jsx'
import Header from '../../shared/components/Header.jsx'

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      page : 1,
      posts: [],
      loading: true
    }
    this.HandleScroll = this.HandleScroll.bind(this)
  }

  async componentDidMount(){
    const posts = await api.post.getList(this.state.page)
    
    this.setState({
      page: this.state.page + 1,
      posts,
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
      const fullHeight = document.documentElement.clientHeight

        if(!(scrolled + viewportHeight + 300 >= fullHeight) ){
          console.log('null')
          return null
        }
        this.setState({loading: true}, async () =>{
            try{
              const posts = await api.post.getList(this.state.page)

              this.setState({
                page: this.state.page + 1, 
                posts: this.state.posts.concat(posts),
                loading: false

              })
              console.log(this.state.posts)
            }catch (error){
              console.log('error', error)
              this.setState({loading: false})
            }
          })
  }


  render() {
   /* if(this.state.loading){
      return(
        <Loading />
      )
    }*/
    return (
      
      <section name="Home">
       <Header />
        <section>
          {this.state.loading && (
            <Loading />
          )}
           {this.state.posts.map(post => <Post key={post.id} {...post}/>)}
        </section>
        <Link to="/about">
          Go to about
        </Link>
      </section>
    );
  }
}

export default Home;
