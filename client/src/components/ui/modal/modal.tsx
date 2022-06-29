import styled from "styled-components";
import { useModalContext } from "../../../context/modal-context";
import { baseTheme } from "../../../theme/baseTheme";

export const Modal = () => {
  const { isShow, content } = useModalContext();

  return (
    <Background show={isShow}>
      <StyledModal show={isShow}>{content}</StyledModal>
    </Background>
  );
};

interface ComponentWithShow {
  show: boolean;
}

const Background = styled.div<ComponentWithShow>`
  width: 100vw;
  height: 100vh;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  background-color: ${baseTheme.colors.modalBg};
  position: absolute;
  transition: visibility 0.3s;
  left: 0;
  top: 0;
`;

const StyledModal = styled.div<ComponentWithShow>`
  border: 10px;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  transition: visibility 0.3s;
  background-color: ${baseTheme.colors.bg2};
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
