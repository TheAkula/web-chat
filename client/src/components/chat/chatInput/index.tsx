import styled from "styled-components";
import { baseTheme } from "../../../theme/baseTheme";

export const ChatInput = () => {
  return (
    <InputContainer>
      <input type="text" placeholder="Message" />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  background-color: ${baseTheme.colors.bg3};
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  input {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 20px;
    color: ${baseTheme.colors.text.content};
  }
`;
