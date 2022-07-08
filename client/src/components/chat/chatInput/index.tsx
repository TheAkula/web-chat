import { FormEventHandler, useState } from "react";
import styled from "styled-components";
import { baseTheme } from "../../../theme/baseTheme";

interface ChatInputProps {
  submited: (text: string) => void;
}

export const ChatInput = ({ submited }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const onSubmitedHandler: FormEventHandler = (e) => {
    e.preventDefault();
    submited(inputValue);
    setInputValue("");
  };

  return (
    <InputContainer>
      <form onSubmit={onSubmitedHandler}>
        <input
          type="text"
          placeholder="Message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  background-color: ${baseTheme.colors.bg3};
  height: 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;

  input {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 20px;
    color: ${baseTheme.colors.text.content};
    width: 100%;
    display: block;
  }
`;
