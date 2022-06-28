import { Link } from "react-router-dom";
import styled from "styled-components";
import { baseTheme } from "../../../theme/baseTheme";

export const AuthLink = styled(Link)`
  color: ${baseTheme.colors.text.author};
  font-size: 18px;
  text-align: center;
  margin: 0 auto;
  margin-top: 20px;
  display: block;
  text-decoration: none;
`;
