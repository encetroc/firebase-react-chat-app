import { useHistory } from "react-router-dom"
import { useStore } from '../Store'
import { RBox, Avatar, ContactName } from '../styled-components'

const Contact = ({ photoURL, displayName, uid }) => {
    const { state, asyncDispatch } = useStore()
    const history = useHistory()

    const handleClick = async (state, contactUid, history) => {
        const contact = state.contacts.find(contact => contact.uid === contactUid)

        if (!contact) {
            asyncDispatch({
                type: 'ADD_NEW_CONTACT',
                payload: {
                    currentUserUid: state.currentUser.userInfoFromAuth.uid,
                    contactUid
                }
            }).then(() => history.push('/contacts'))
            return
        }

        const chatroom = state.chatrooms.find(chatroom => chatroom.recipients[0].uid === contactUid)

        if (!chatroom) {
            asyncDispatch({
                type: 'ADD_CHATROOM',
                payload: {
                    recipients: [contactUid, state.currentUser.userInfoFromAuth.uid],
                    currentUser: state.currentUser.userInfoFromAuth,
                    contacts: state.contacts
                }
            }).then((chatroomId) => history.push(`/chatroom/${chatroomId}`))
        } else {
            history.push(`/chatroom/${chatroom.id}`)
        }
    }

    return (
        <RBox alignItems='center' gap='1rem' onClick={() => handleClick(state, uid, history)}>
            <Avatar small src={photoURL} />
            <ContactName>{displayName}</ContactName>
        </RBox>
    )
}

export default Contact
