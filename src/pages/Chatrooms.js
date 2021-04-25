import { useEffect } from 'react'
import { useStore } from '../Store'
import { Link } from "react-router-dom";
import { CBox, RBox, Avatar, Title, CDivider, FloatingButton, CircleButton } from '../styled-components'
import { MenuIcon, SearchIcon, ChatIcon } from '../icons'
import { ChatroomOverview } from '../components'

const Chatrooms = () => {
    const { state, dispatch } = useStore()

    return (
        <CBox>
            <RBox alignItems='center' justifyContent='space-between'>
                <RBox alignItems='center' gap='1em'>
                    <Avatar src={state.currentUser.userInfoFromDatabase && state.currentUser.userInfoFromDatabase.photoURL} />
                    <Title>Chats</Title>
                </RBox>
                <RBox reverse alignItems='center' gap='1em'>
                    <CircleButton small>
                        <MenuIcon />
                    </CircleButton>
                    <CircleButton small>
                        <SearchIcon />
                    </CircleButton>
                </RBox>
            </RBox>
            <CDivider />
            <CBox gap='1rem'>
                {
                    state.chatrooms && state.chatrooms.map(chatroom => state.messages[chatroom.id] && <ChatroomOverview key={chatroom.id} id={chatroom.id} messages={state.messages[chatroom.id].messages} recipients={chatroom.recipients} />)
                }
            </CBox>
        </CBox>
    )
}

export default Chatrooms
