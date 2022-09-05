import React from 'react'

const MessageItem = ({message}) => {
    return (
        <article class="activities__box" key={message.id}>
            <div class="activities__boxHeader roomListRoom__header">
                <a href="/base/profile" class="roomListRoom__author">
                    <div class="avatar avatar--small">

                    </div>
                </a>
                <p>
                    @{message.user}
                    <span>{message.created}</span>
                </p>
            </div>
            <div class="activities__boxContent">
                <p>replied to post</p>
                <div class="activities__boxRoomContent">{message.body}</div>
            </div>
            
        </article>
    );
}

const MessageList = ({messages}) => {
    console.log('messages: ', messages);

    if (messages == null) {
        return (
            <p>Loading...</p>
        );
    } else {
        return (
            <section class="activities">
                <div class="activities__header">
                    <h2>Recent Activities</h2>
                </div>
                {messages.map((message, index) => {
                    return (
                        <MessageItem message={message} key={index}/>
                    );
                })}
            </section>
        );
    }
}

export default MessageList