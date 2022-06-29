import { ReactNode } from "react";
import styled from "styled-components";
import { Button } from "../../button";

interface ModalControlProps {
  clicked: () => void;
  children: string | ReactNode;
}

export const ModalControl = ({ clicked, children }: ModalControlProps) => {
  return <StyledButton onClick={clicked}>{children}</StyledButton>;
};

const StyledButton = styled(Button)`
  flex: 1;
`;
