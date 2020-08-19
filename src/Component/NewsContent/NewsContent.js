import React from 'react';
import '../../scss/NewsContent.scss'

function NewsContent(props) {
    return (
        <div>
            <br />
            <div className="news-content">
                {props.image}
                <div className="news-text">
                  <h1>{props.title}</h1>
                  <p>{props.description}</p>
                  <a href="#">{props.url}</a>
                </div>
            </div>
        </div>
    )
}

export default NewsContent;
