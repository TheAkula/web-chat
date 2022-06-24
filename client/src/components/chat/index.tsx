import styled from "styled-components";
import { baseTheme } from "../../theme/baseTheme";
import { Message } from "../../types";
import { ChatInput } from "./chatInput";
import { ChatMessages } from "./chatMessages";

const messages: Message[] = [
  {
    authorName: "Author 1",
    content: "Message",
    authorId: "1",
    authorImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    id: "1",
    date: new Date(),
  },
  {
    authorName: "Author 2",
    content: "other Message",
    authorId: "2",
    authorImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    id: "2",
    date: new Date(),
  },
];

export const Chat = () => {
  return (
    <StyledChat>
      <ChatMessages messages={messages} />
      <ChatInput />
    </StyledChat>
  );
};

const StyledChat = styled.div`
  background-color: ${baseTheme.colors.bg2};
  display: grid;
  grid-template-rows: 1fr auto;
`;
