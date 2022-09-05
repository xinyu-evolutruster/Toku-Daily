import React, {useState, useEffect} from 'react'

import RoomList from '../components/roomList'
import MessageList from '../components/messageList'
import TopicList from '../components/topicList'

const HomePage = () => {

    let [home, setHome] = useState({
        "rooms": [], 
        "room_messages": [],
        "topics": []
    });

    useEffect(() => {
        getHomePage()
    }, [])

    let getHomePage = async() => {
        let response = await fetch('/base/')
        let data = await response.json()
        console.log('DATA: ', data)
        setHome(data)
        console.log('home: ', home)
    }

    return (  
        <main class="layout layout--3">
            <div class="container">

                <aside className='topic-list'>
                <TopicList topics={home["topics"]} />
                </aside>

                <section class="roomList">
                    <div class="roomList__header">
                        <h2>Chat Rooms</h2>
                        <p>{home.room_count} Rooms available</p>
                    </div>
                    <a class="btn btn--main" href="/base/create-room">
                        <title>add</title>
                        <path
                        d="M16.943 0.943h-1.885v14.115h-14.115v1.885h14.115v14.115h1.885v-14.115h14.115v-1.885h-14.115v-14.115z">
                        </path>
                        Create Room
                    </a>
                    <RoomList rooms={home["rooms"]}/>
                    <h3>ends</h3>
                </section>

                <aside className='room-messages'>
                    <MessageList messages={home["room_messages"]}/>
                </aside>

            </div>
        </main>
    )
}

export default HomePage