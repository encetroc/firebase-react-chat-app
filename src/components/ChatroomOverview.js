import { CBox, RBox, Avatar, ContactName, TimeStamp, LastMessage } from '../styled-components'
import { formatSeconds } from '../helpers'

const ChatroomOverview = ({ messages, recipients, id }) => {
    return (
        <RBox alignItems='center' gap='1rem' onClick={() => console.log(id)}>
            <Avatar src={recipients[0].photoURL} />
            <CBox flexGrow='1' justifyContent='center' gap='0.3rem'>
                <RBox justifyContent='space-between'>
                    <ContactName>{recipients[0].displayName}</ContactName>
                    <TimeStamp>{messages && formatSeconds(messages[0].createdAt.seconds)}</TimeStamp>
                </RBox>
                <LastMessage>{messages && messages[0].content}</LastMessage>
            </CBox>
        </RBox>
    )
}

export default ChatroomOverview
