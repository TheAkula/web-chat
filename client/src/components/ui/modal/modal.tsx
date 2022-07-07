import styled from "styled-components";
import { useModalContext } from "../../../context/modal-context";
import { baseTheme } from "../../../theme/baseTheme";

export const Modal = () => {
  const { isShow, content, close } = useModalContext();

  return (
    <>
      <StyledModal show={isShow}>{content}</StyledModal>
      <Background show={isShow} onClick={close} />
    </>
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
  transition: opacity 0.3s;
  left: 0;
  top: 0;
  opacity: ${({ show }) => (show ? "1" : "0")};
  z-index: ${baseTheme.zIndexes.modalBg};
`;

const StyledModal = styled.div<ComponentWithShow>`
  border: 10px;
  opacity: ${({ show }) => (show ? "1" : "0")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  transition: opacity 0.3s;
  background-color: ${baseTheme.colors.bg2};
  padding: 20px;
  position: absolute;
  width: 600px;
  left: 50%;
  border-radius: 10px;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: ${baseTheme.zIndexes.modal};
`;
