import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import RoomMessageList from '../components/roomMessageList';

const RoomPage = () => {

    // let roomId = match.params.id;
    let roomId = useParams().id;
    console.log('roomId: ', roomId)

    let [room, setRoom] = useState(null);
    useEffect(() => {
        getRoom()
    }, [roomId]);

    let getRoom = async() => {
        let response = await fetch(`/base/room/${roomId}/`);
        let data = await response.json();
        console.log('DATA: ', data);
        setRoom(data);
        console.log('roomdata: ', room)
    }

    return (
        <main class="profile-page layout layout--2">
            <div class="container">
                <div class="room">
                    <div class="room__top">

                    </div>
                </div>
            </div>
            <div class="room__box scroll">
                <h3>{room?.room.name}</h3>
                <p>{room?.room.description}</p>
                <RoomMessageList messages={room?[room.room_messages]:null}/>
            </div>
        </main>
    )
}

export default RoomPage