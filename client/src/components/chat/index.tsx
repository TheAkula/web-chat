import styled from "styled-components";
import { useAppContext } from "../../context/app-context";
import { baseTheme } from "../../theme/baseTheme";
import { ChatInput } from "./chatInput";
import { ChatMessages } from "./chatMessages";

export const Chat = () => {
  const { messages, chosenChat } = useAppContext();

  return (
    <StyledChat>
      <ChatMessages
        messages={chosenChat ? messages.items : []}
        loading={messages.loading}
      />
      <ChatInput />
    </StyledChat>
  );
};

const StyledChat = styled.div`
  background-color: ${baseTheme.colors.bg2};
  display: grid;
  height: calc(100vh - 80px);
  grid-template-rows: 1fr 60px;
`;
