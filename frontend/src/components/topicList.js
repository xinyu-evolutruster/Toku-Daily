import React from 'react'

const TopicItem = ({topic}) => {
    return (
        <div>
            <p>{topic.name}</p>
        </div>
    )
}

const TopicList = ({topics}) => {
    return (
        <div class="topics">
            <div class="topic__header">
                <h2>Browse Topics</h2>
            </div>
            <ul class="topics__list">
                <li>
                    <a href="/base/" class="active">All <span>{topics.count}</span></a>
                </li>
                {topics.map(topic => {
                    return (
                        <li>
                            <a href="/base/">{topic.name} <span>{topic.id}</span> </a>
                        </li>
                    );
                })}
            </ul>
            <a class="btn btn--link" href="/base/topics/">
                More
            </a>
        </div>
    );
}

export default TopicList