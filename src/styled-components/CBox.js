import styled from 'styled-components'

export default styled.div`
    display: flex;
    flex-direction: ${props => props.reverse ? 'column-reverse' : 'column'};
    height: 100%;
    gap: ${props => props.gap || 0};
    align-items: ${props => props.alignItems || 'unset'};
    justify-content: ${props => props.justifyContent || 'unset'};
    flex-grow: ${props => props.flexGrow || 'unset'};
    overflow-y: auto;
`