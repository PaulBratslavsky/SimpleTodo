import React from "react";
import styled from "styled-components";

const TabStyled = styled.li`
  list-style: none;
  font-size: 1.4rem;
  padding: 0.3rem;
  font-weight: bold;
  text-align: center;
  flex: 1;
  background: ${({ isActive, color }) => (isActive ? color : "white")};
  color: ${({ isActive, color }) => (!isActive ? color : "white")};
`;

const Tab = ({ activeTab, color, label, onClick }) => {
  const [isActive, setIsActive] = React.useState();

  React.useEffect(() => {
    if (activeTab === label) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeTab, label]);

  return (
    <TabStyled isActive={isActive} color={color} onClick={() => onClick(label)}>
      {label}
    </TabStyled>
  );
};

export default Tab;
