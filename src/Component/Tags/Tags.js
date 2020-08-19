import React from 'react';
import '../../scss/Tags.scss'

function Tags(props) {
    const {tagname, news, sport, history, ent, onClick} = props;

    const className = `tags ${news ? 'newsTag': ''} ${sport ? 'sportTag': ''} ${history ? 'historyTag': ''} ${ent ? 'entTag': ''}`
    return (
        <div className="tag-content">
            {tagname} {onClick}
        </div>
    )
}

export default Tags;
