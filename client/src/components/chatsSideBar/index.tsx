import styled from "styled-components";
import { baseTheme } from "../../theme/baseTheme";
import { Contact } from "../../types";
import { ContactsList } from "../chats/contactsList";

const contacts: Contact[] = [
  {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    title: "First chat",
    prevMessage: {
      content: "Message 1",
      isRead: false,
    },
    notReadMessagesAmount: 1,
    id: "1",
  },
  {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    title: "Second chat",
    prevMessage: {
      content: "Message 2",
      isRead: true,
    },
    notReadMessagesAmount: 0,
    id: "2",
  },
];

export const ChatsSideBar = () => {
  return (
    <StyledChatsSideBar>
      <ContactsList contacts={contacts} />
    </StyledChatsSideBar>
  );
};

const StyledChatsSideBar = styled.div`
  background-color: ${baseTheme.colors.bg1};
`;
