import styled from 'styled-components'
import defaultAvatar from '../assets/avatar.png'

const Avatar = styled.img`
    vertical-align: middle;
    width: ${props => props.small ? '2rem' : '3rem'};
    height: ${props => props.small ? '2rem' : '3rem'};
    border-radius: 50%
`

Avatar.defaultProps = {
    src: defaultAvatar,
}

export default Avatar