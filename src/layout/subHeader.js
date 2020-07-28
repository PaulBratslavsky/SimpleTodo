import React from 'react'
import styled from 'styled-components'

const SubHeaderStyled = styled.div`
    z-index: ${({stack}) => stack ? stack : 0};
    position: ${({position}) => position ? position : 'static'}; 
    top: ${({top}) => top ? top : 0};
    padding: ${({padding}) => padding ? padding : '0.5rem'};

    display: flex;
    align-items: center;
    justify-content:  ${({justify}) => justify ? justify : 'space-between'};

    background: ${({color}) => color ? color : 'white'};
    color: ${({textColor}) => textColor ? textColor : 'black'};

`

const SubHeader = (props) => <SubHeaderStyled {...props}>
    {props.children}
</SubHeaderStyled>

export default SubHeader;