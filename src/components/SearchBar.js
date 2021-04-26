import { useRef } from 'react'
import { RBox, CircleButton, Input } from '../styled-components'
import { BackButton } from '../components'
import { SearchIcon } from '../icons'

const SearchBar = ({ clickAction, payload, actionType, backCustom }) => {
    const inputRef = useRef()

    const handleClick = () => {
        if (inputRef.current.value !== '') {
            clickAction({
                type: actionType,
                payload: {
                    ...payload,
                    inputValue: inputRef.current.value
                }
            })
        }
    }

    return (
        <RBox>
            <BackButton backCustom={backCustom} />
            <Input grow='1' ref={inputRef} />
            <CircleButton onClick={handleClick}>
                <SearchIcon />
            </CircleButton>
        </RBox>
    )
}

export default SearchBar
