import { useEffect } from 'react'
import { useStore } from '../Store'
import { Link } from "react-router-dom";
import { CBox, RBox, Avatar, Title, CDivider, FloatingButton, CircleButton } from '../styled-components'
import { MenuIcon, SearchIcon, ChatIcon } from '../icons'
import { ChatroomOverview } from '../components'

const Chatrooms = () => {
    const { state } = useStore()
    const chatrooms = state.chatrooms || []

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
                    chatrooms.map(chatroom => <ChatroomOverview key={chatroom.id} chatroom={chatroom} />)
                }
            </CBox>
            <FloatingButton>
                <Link to="/contacts"><ChatIcon fill='hsl(0, 0%, 100%)' /></Link>
            </FloatingButton>
        </CBox>
    )
}

export default Chatrooms
