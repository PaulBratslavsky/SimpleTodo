import React from "react";
import Tab from "./tab.js";
import styled from "styled-components";

const TabsStyled = styled.div`
  .tab-list {
    display: flex;
  }
`;

const Tabs = ({ children }) => {
  const [active, setActive] = React.useState(children[0].props.label);
  const onClickTabItem = (tab) => setActive(tab);

  return (
    <TabsStyled>
      <ul className="tab-list">
        {children.map((child) => {
          const { label, color } = child.props;

          return (
            <Tab
              activeTab={active}
              key={label}
              label={label}
              color={color}
              onClick={onClickTabItem}
            />
          );
        })}
      </ul>
      <div>
        {children.map((child) => {
          if (child.props.label !== active) return undefined;
          return child.props.children;
        })}
      </div>
    </TabsStyled>
  );
};

export default Tabs;
