import { useStore } from '../Store'
import { SearchBar, Contact } from '../components'
import { CBox, CDivider } from '../styled-components'

const AddContact = () => {
    const { state, asyncDispatch } = useStore()

    const contact = state.foundContact

    const payload = {
        currentUser: state.currentUser.userInfoFromAuth,
        contacts: state.contacts
    }

    return (
        <CBox>
            <SearchBar clickAction={asyncDispatch} payload={payload} actionType={'FIND_CONTACT'} backCustom='/contacts' />
            <CDivider />
            <CBox>
                {contact && contact.uid && <Contact {...contact} />}
            </CBox>
        </CBox>
    )
}

export default AddContact
