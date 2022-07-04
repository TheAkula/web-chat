import styled from "styled-components";
import { baseTheme } from "../../theme/baseTheme";
import { ContactsList } from "../chats/contactsList";

export const ChatsSideBar = () => {
  return (
    <StyledChatsSideBar>
      <ContactsList />
    </StyledChatsSideBar>
  );
};

const StyledChatsSideBar = styled.div`
  background-color: ${baseTheme.colors.bg1};
`;
