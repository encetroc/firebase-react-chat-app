import { useHistory } from "react-router-dom";

import { RBox, CircleButton, ContactName } from '../styled-components'
import { PersonAddIcon } from '../icons'

const AddNewContact = () => {
    const history = useHistory();
    return (
        <RBox alignItems='center' gap='1em' onClick={() => history.push('/add-contact')}>
            <CircleButton small>
                <PersonAddIcon />
            </CircleButton>
            <ContactName>
                Add new contact
            </ContactName>
        </RBox>
    )
}

export default AddNewContact
