import styled from 'styled-components'

export default styled.div`
    display: flex;
    flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
    width: 100%;
    gap: ${props => props.gap || 0};
    align-items: ${props => props.alignItems || 'unset'};
    justify-content: ${props => props.justifyContent || 'unset'};
    flex-grow: ${props => props.flexGrow || 'unset'};
    flex-shrink: ${props => props.flexShrink || 'unset'};
`