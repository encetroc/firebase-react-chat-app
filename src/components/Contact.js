import { useStore } from '../Store'
import { RBox, Avatar, ContactName } from '../styled-components'

const Contact = ({ photoURL, displayName, uid, onClick }) => {
    const { state, asyncDispatch } = useStore()

    const handleClick = (state, contactUid) => {
        const contact = state.contacts.find(contact => contact.uid === contactUid)

        if (!contact) {
            // add contact to contact list
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
            })
        }
    }

    return (
        <RBox alignItems='center' gap='1rem' onClick={() => handleClick(state, uid)}>
            <Avatar small src={photoURL} />
            <ContactName>{displayName}</ContactName>
        </RBox>
    )
}

export default Contact
