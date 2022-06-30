import styled from "styled-components";
import { baseTheme } from "../../theme/baseTheme";

export const Button = styled.button`
  border: none;
  outline: none;
  background-color: #439ae6;
  color: ${baseTheme.colors.white};
  height: 50px;
  border-radius: 6px;
  padding: 0px 15px;
  font-size: 20px;
  display: block;
  cursor: pointer;

  :hover {
    background-color: #3880c0;
    color: #ececec;
  }
`;
