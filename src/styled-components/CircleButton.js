import styled from 'styled-components'

export default styled.button`
    border: none;
    outline: none;
    vertical-align: middle;
    background:  hsl(240, 9%, 96%);
    width: ${props => props.small ? '2rem' : '3rem'};
    height: ${props => props.small ? '2rem' : '3rem'};
    border-radius: ${props => props.borderRadius || '50%'};
    &:hover {
        cursor: pointer;
    }
`