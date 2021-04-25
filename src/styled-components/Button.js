import styled from 'styled-components'

export default styled.button`
    padding: 1em 2em;
    font-weight: 600;
    border: none;
    background: hsl(204, 100%, 50%);
    color: hsl(0, 0%, 100%);
    border-radius: 2em;
    min-width: 10rem;
    outline: none;
    &:hover {
        cursor: pointer;
    }
`