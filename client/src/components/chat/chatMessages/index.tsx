import styled from "styled-components";
import { baseTheme } from "../../../theme/baseTheme";
import { Message as MessageType } from "../../../types";
import { Message } from "./message";

interface ChatMessagesProps {
  messages: MessageType[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <StyledChatMessages>
      {messages.map((m) => (
        <Message key={m.id} {...m} />
      ))}
    </StyledChatMessages>
  );
};

const StyledChatMessages = styled.div`
  background-color: ${baseTheme.colors.bg2};
  overflow-y: auto;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-self: flex-end;
`;
