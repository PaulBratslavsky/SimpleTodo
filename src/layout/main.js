import React from "react";
import styled from "styled-components";

const MainStyled = styled.div`
  min-height: 100vh;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 45px 30px 1fr;
  /* grid-row-gap: 8px; */
`;

const Main = ({ children }) => <MainStyled>{children}</MainStyled>;

export default Main;
