import { useStore } from '../Store'
import { CBox, RBox, Title, CDivider, SubTitle, CircleButton } from '../styled-components'
import { SearchIcon, RefreshIcon } from '../icons'
import { Contact, BackButton, AddNewContact } from '../components'

const Contacts = () => {
    const { state } = useStore()

    return (
        <CBox>
            <RBox alignItems='center' justifyContent='space-between'>
                <RBox alignItems='center' gap='1em'>
                    <BackButton />
                    <CBox gap='0.1em'>
                        <Title>Contacts</Title>
                        <SubTitle>106 contact</SubTitle>
                    </CBox>
                </RBox>
                <RBox reverse alignItems='center' gap='1em'>
                    <CircleButton small>
                        <RefreshIcon />
                    </CircleButton>
                    <CircleButton small>
                        <SearchIcon />
                    </CircleButton>
                </RBox>
            </RBox>
            <CDivider />
            <CBox gap='1rem'>
                <AddNewContact />
                {state.contacts && state.contacts.map(contact => <Contact key={contact.uid} {...contact} />)}
            </CBox>
        </CBox>
    )
}

export default Contacts
