import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

//redux
import actions from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
class Post extends Component {

    constructor(props){
        super(props)
       
        this.state = {
            loading: true,
            user: props.user || null,
            comments: props.comments || null
        }
    }

    async componentDidMount(){
        if(!!this.props.user && !!this.props.comments) return this.setState({loading:false})
         await Promise.all([
            this.props.actions.loadUser(this.props.userId),
            this.props.actions.loadCommentsForPost(this.props.id)
        ])
        this.setState({loading: false })
    }
    render() {
        return (
            <article id={`post-${this.props.id}`}>
                <Link to={`/post/${this.props.id}`}>
                <h2>{this.props.title}</h2>
                </Link>
                <p>
                    {this.props.body}
                </p>
                {!this.state.loading && 
                    <div>
                    <Link to={`/user/${this.props.user.id}`}>
                       {this.props.user.name}
                    </Link>
                    <span>
                    Hay {this.props.comments.length} comentarios
                    </span>
                    </div>
            }
            </article>

        )
    }

}

Post.propTypes = {
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    user:PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
        
    }),
    comments: PropTypes.arrayOf(
        PropTypes.object
    ),
    actions: PropTypes.objectOf(
        PropTypes.func
    )
}

function mapStateToProps(state, props){ //se reciben los props propios del componente
    return {
        comments: state.comments.filter(comments => comments.postId == props.id),
        user: state.user[props.userId]
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)