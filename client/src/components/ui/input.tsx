import styled from "styled-components";
import { baseTheme } from "../../theme/baseTheme";

export const Input = styled.input`
  background-color: ${baseTheme.colors.bg3};
  padding: 5px 10px;
  border-radius: 6px;
  height: 55px;
  border: 3px solid ${baseTheme.colors.bg1};
  font-size: 20px;
  margin-bottom: 20px;
  width: 100%;
  color: ${baseTheme.colors.text.content};
  outline: none;
`;
