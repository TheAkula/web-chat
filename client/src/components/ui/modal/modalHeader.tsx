import styled from "styled-components";
import { baseTheme } from "../../../theme/baseTheme";

interface ModalHeaderProps {
  title: string;
}

export const ModalHeader = ({ title }: ModalHeaderProps) => {
  return (
    <StyledHeader>
      <h2>{title}</h2>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  text-align: center;
  padding-top: 10px;
  margin-bottom: 40px;
  font-size: 20px;
  font-weight: 500;
  color: ${baseTheme.colors.white};
`;
