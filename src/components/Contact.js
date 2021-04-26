import { RBox, Avatar, ContactName } from '../styled-components'

const Contact = ({ photoURL, displayName, onClick }) => {
    return (
        <RBox alignItems='center' gap='1rem' onClick={onClick}>
            <Avatar small src={photoURL} />
            <ContactName>{displayName}</ContactName>
        </RBox>
    )
}

export default Contact
