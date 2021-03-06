import styled from "styled-components";
import { MessagesQuery } from "../../../generated/graphql";
import { Message } from "./message";

interface ChatMessagesProps {
  messages: MessagesQuery["messages"] | undefined;
  loading: boolean;
}

export const ChatMessages = ({ messages, loading }: ChatMessagesProps) => {
  return (
    <StyledChatMessages>
      {!loading &&
        !!messages?.length &&
        [...messages]
          .reverse()
          .map((m) => (
            <Message
              key={m.id}
              {...m}
              author={[m.author.firstName, m.author.lastName].join(" ")}
            />
          ))}
    </StyledChatMessages>
  );
};

const StyledChatMessages = styled.div`
  overflow: auto;
  display: flex;
  padding: 20px;
  flex-direction: column-reverse;
  height: 100%;
  align-self: flex-end;
`;
