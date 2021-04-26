import { useStore } from '../Store'
import { useHistory } from "react-router-dom";

import { CBox, RBox, Avatar, ContactName, TimeStamp, LastMessage } from '../styled-components'
import { formatSeconds } from '../helpers'

const ChatroomOverview = ({ chatroom }) => {
    const history = useHistory();
    const { state } = useStore()
    const messages = state.messages[chatroom.id] && state.messages[chatroom.id].messages || []

    return (
        <RBox alignItems='center' gap='1rem' onClick={() => history.push(`/chatroom/${chatroom.id}`)}>
            <Avatar src={chatroom.recipients[0] && chatroom.recipients[0].photoURL} />
            <CBox flexGrow='1' justifyContent='center' gap='0.3rem'>
                <RBox justifyContent='space-between'>
                    <ContactName>{chatroom.recipients[0] && chatroom.recipients[0].displayName}</ContactName>
                    <TimeStamp>{messages && messages[0] && formatSeconds(messages[0].createdAt.seconds)}</TimeStamp>
                </RBox>
                <LastMessage>{messages && messages[0] && messages[0].content}</LastMessage>
            </CBox>
        </RBox>
    )
}

export default ChatroomOverview
