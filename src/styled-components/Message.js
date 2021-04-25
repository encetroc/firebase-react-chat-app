import styled from 'styled-components'

export default styled.div`
    max-width: 90%;
    background: ${props => props.message.isOwned ? 'hsl(204, 100%, 50%)' : 'hsl(223, 15%, 91%)'};
    color: ${props => props.message.isOwned ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 2%)'};
    padding: 10px 20px;
    margin-bottom: 10px;
    align-self: ${props => props.message.isOwned ? 'flex-end' : 'flex-start'};
    border-radius: ${props => props.message.isOwned ? '30px 30px 5px 30px' : '30px 30px 30px 5px'};
    overflow-wrap: break-word;

`