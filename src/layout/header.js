import React from 'react'
import styled from 'styled-components'

const HeaderStyled = styled.header`
    z-index: 0;
    position: sticky; 
    top: 0;

    background: #343a40;
    color: #f3f3f3;
    padding: 0 1rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
        font-size: 1.4rem;
    }
`

const Header = ({children}) => <HeaderStyled>
    <h1 className="title">Todo Simple</h1>
    {children}
</HeaderStyled>

export default Header;