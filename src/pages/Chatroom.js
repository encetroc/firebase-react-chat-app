import { useRef } from 'react'
import { useStore } from '../Store'
import { CBox, RBox, Avatar, Title, CDivider, CircleButton, Input, ContactName, Message } from '../styled-components'
import { MenuIcon, SearchIcon, EmojiIcon, SendIcon, AttachFileIcon } from '../icons'
import { BackButton } from '../components'

const Chatroom = ({ match }) => {
    const messageContentRef = useRef()
    const { state, asyncDispatch } = useStore()
    const chatroom = state.chatrooms.find(chatroom => chatroom.id === match.params.id)
    const messages = state.messages[match.params.id] && state.messages[match.params.id].messages

    const sendMessage = () => {
        asyncDispatch({
            type: 'ADD_MESSAGE',
            payload: {
                chatroomId: match.params.id,
                userUid: state.currentUser.userInfoFromAuth.uid,
                messageContent: messageContentRef.current.value
            }
        })
        messageContentRef.current.value = ''
    }

    return (
        <CBox>
            <RBox alignItems='center' justifyContent='space-between'>
                <RBox alignItems='center' gap='1em'>
                    <BackButton backCustom='/chatrooms' />
                    <Avatar src={chatroom.recipients[0] && chatroom.recipients[0].photoURL} />
                    <ContactName>{chatroom.recipients[0] && chatroom.recipients[0].displayName}</ContactName>
                </RBox>
                <RBox reverse alignItems='center' gap='1em' flexShrink='10'>
                    <CircleButton small>
                        <MenuIcon />
                    </CircleButton>
                    <CircleButton small>
                        <SearchIcon />
                    </CircleButton>
                </RBox>
            </RBox>
            <CDivider />
            <CBox gap='0.2rem' reverse>
                {messages && messages.map(message => <Message key={message.id} message={message}>{message.content}</Message>)}
            </CBox>
            <RBox alignItems='center'>
                <CircleButton borderRadius='50% 0 0 50%'>
                    <EmojiIcon />
                </CircleButton>
                <Input borderRadius='0' ref={messageContentRef} />
                <CircleButton borderRadius='0 50% 50% 0'>
                    <AttachFileIcon />
                </CircleButton>
                <CircleButton onClick={sendMessage}>
                    <SendIcon />
                </CircleButton>
            </RBox>
        </CBox>
    )
}

export default Chatroom
