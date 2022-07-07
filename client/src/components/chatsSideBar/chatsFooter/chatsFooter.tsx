import styled from "styled-components";
import { baseTheme } from "../../../theme/baseTheme";
import { AddChat } from "./chatsFooterControls";

export const ChatsFooter = () => {
  return (
    <StyledFooter>
      <AddChat />
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  background-color: ${baseTheme.colors.bg1};
  height: 60px;
`;
