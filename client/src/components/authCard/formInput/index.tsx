import { ChangeEventHandler, useRef, useState } from "react";
import styled from "styled-components";
import { baseTheme } from "../../../theme/baseTheme";

interface FormInputProps {
  type?: "text" | "password" | "email";
  placeholder: string;
  curValue: string;
  changed: (s: string) => void;
}

export const FormInput = ({
  type = "text",
  placeholder,
  curValue,
  changed,
}: FormInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const onChangedHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    changed(e.target.value);
  };

  return (
    <InputContainer>
      <StyledInput
        value={curValue}
        type={type}
        placeholder={placeholder}
        onChange={onChangedHandler}
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Line haveValue={!!curValue} focused={isFocused} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  background-color: transparent;
  height: 50px;
  margin-bottom: 20px;
  padding: 0 5px;
  border: none;
  outline: transparent;
  display: block;
  font-size: 20px;
  color: ${baseTheme.colors.text.content};
  width: 100%;
`;

interface LineProps {
  haveValue: boolean;
  focused: boolean;
}

const Line = styled.div<LineProps>`
  content: "";
  display: block;
  height: 3px;
  background-color: #555555;
  width: ${({ haveValue, focused }) => (haveValue || focused ? "100%" : "0")};
  transition: width 0.3s ease;
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translate(-50%);
`;
