import styled from "styled-components";
import { baseTheme } from "../../theme/baseTheme";
import { AddChatGroup } from "./addChatGroup";
import { ChatGroup } from "./chatGroup";

export const ChatGroupSideBar = () => {
  const onClickedHandler = () => {};

  return (
    <StyledSideBar>
      <ChatGroup title="Chat" chatGroupId="1" clicked={onClickedHandler} />
      <AddChatGroup />
    </StyledSideBar>
  );
};

const StyledSideBar = styled.div`
  background-color: ${baseTheme.colors.bg2};
  padding: 10px;
`;
