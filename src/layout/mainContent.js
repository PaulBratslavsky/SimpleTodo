import React from 'react';
import styled from 'styled-components';

const MainContentStyled = styled.main`
    z-index: 1;
    position: sticky;
    top: 0;
    background: #425763;
    color: darkgray;
    padding-bottom: 50px;
`

const MainContent = ({children}) => <MainContentStyled>
    {children}
</MainContentStyled>

export default MainContent;