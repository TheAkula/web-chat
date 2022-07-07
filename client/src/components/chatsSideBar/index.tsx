import styled from "styled-components";
import { baseTheme } from "../../theme/baseTheme";
import { ChatsFooter } from "./chatsFooter";
import { ChatsList } from "./chatsList";

export const ChatsSideBar = () => {
  return (
    <StyledChatsSideBar>
      <ChatsList />
      <ChatsFooter />
    </StyledChatsSideBar>
  );
};

const StyledChatsSideBar = styled.div`
  background-color: ${baseTheme.colors.bg1};
  display: grid;
  grid-template-rows: 1fr auto;
`;
