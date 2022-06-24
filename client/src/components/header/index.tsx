import styled from "styled-components";
import { baseTheme } from "../../theme/baseTheme";
import { ProfileIcon } from "./profileIcon";

export const Header = () => {
  return (
    <StyledHeader>
      <ProfileIcon />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  height: 80px;
  background-color: ${baseTheme.colors.bg1};
  display: flex;
  align-items: center;
  padding: 0 20px;
`;
