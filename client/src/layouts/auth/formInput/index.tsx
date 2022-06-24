import { ChangeEventHandler } from "react";
import styled from "styled-components";

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
  const onChangedHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    changed(e.target.value);
  };

  return (
    <StyledInput
      value={curValue}
      type={type}
      placeholder={placeholder}
      onChange={onChangedHandler}
    />
  );
};

const StyledInput = styled.input`
  background-color: transparent;
  height: 60px;
  margin-bottom: 20px;
  padding: 0 20px;
`;
