import React from 'react';
import {Link} from 'react-router-dom'

const RoomItem = ({room}) => {
    console.log('room: ', room);
    return (
        <article class="roomListRoom">
            <div class="roomListRoom__header">
                <a href="/base/profile/" class="roomListRoom__author">
                    <div class="avatar avatar--small">

                    </div>
                    <span>@{room.host}</span>
                </a>
                <div class="roomListRoom__actions">
                    <span>{room.created}</span>
                </div>
            </div>
            <div class="roomListRoom__content">
                <Link to={`/room/${room.id}`}>
                    <h3>{room.name}</h3>
                </Link>
            </div>
            <div class="roomListRoom__meta">
                <p>{room.description}</p>
                <hr/>
                <p class="roomListRoom__topic">{room.topic}</p>
            </div>
        </article>
    );
};

const RoomList = ({rooms}) => {
    console.log('rooms: ', rooms);
    
    return(
        <div>
            {rooms.map(room => {
                return (
                    <RoomItem room={room}/>
                );
            })}
        </div> 
    );
};

export default RoomList