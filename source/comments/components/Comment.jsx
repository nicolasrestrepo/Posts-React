import React from 'react'

function Comment(props){
    return(
        <article id={`comment-${props.id}`}>
            By: <a href={`mailto:${props.email}`}>{props.name}</a>
            <p>
            {props.body}
            </p>
        </article>
    )
}

export default Comment