import styled from 'styled-components'

export default styled.input`
    padding: 1em 2em;
    background: hsl(240, 9%, 96%);
    border-radius: ${props => props.borderRadius || '2em'};
    outline: none;
    border: none;
    height: ${props => props.small ? '2rem' : '3rem'};
    flex-grow: ${props => props.grow || 'unset'};
    min-width: 0;
`