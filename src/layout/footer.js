import React from "react";
import styled from "styled-components";

const FooterStyled = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0%;
  width: 100%;
  z-index: 3;
  background: none;
  color: white;
`;

const Footer = ({ children }) => <FooterStyled>{children}</FooterStyled>;

export default Footer;
