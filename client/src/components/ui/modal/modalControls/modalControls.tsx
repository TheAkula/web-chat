import React from "react";
import styled from "styled-components";

interface ModalControlsProps {
  children: [React.ReactNode, React.ReactNode?, React.ReactNode?];
}

export const ModalControls = ({ children }: ModalControlsProps) => {
  return <StyledModalControls>{children}</StyledModalControls>;
};

const StyledModalControls = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
