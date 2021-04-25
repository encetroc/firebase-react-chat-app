import { useHistory } from "react-router-dom";

import { CBox, RBox, Avatar, ContactName, TimeStamp, LastMessage } from '../styled-components'
import { formatSeconds } from '../helpers'

const ChatroomOverview = ({ messages, recipients, id }) => {
    const history = useHistory();

    return (
        <RBox alignItems='center' gap='1rem' onClick={() => history.push(`/chatroom/${id}`)}>
            <Avatar src={recipients[0].photoURL} />
            <CBox flexGrow='1' justifyContent='center' gap='0.3rem'>
                <RBox justifyContent='space-between'>
                    <ContactName>{recipients[0].displayName}</ContactName>
                    <TimeStamp>{messages && messages[0] && formatSeconds(messages[0].createdAt.seconds)}</TimeStamp>
                </RBox>
                <LastMessage>{messages && messages[0] && messages[0].content}</LastMessage>
            </CBox>
        </RBox>
    )
}

export default ChatroomOverview
