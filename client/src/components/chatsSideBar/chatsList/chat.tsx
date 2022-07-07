import styled from "styled-components";
import { baseTheme } from "../../../theme/baseTheme";

interface ChatProps {
  id: string;
  name: string;
  clicked: (id: string) => void;
  isActive: boolean;
}

export const Chat = ({ name, clicked, id, isActive }: ChatProps) => {
  return (
    <StyledChat isActive={isActive} onClick={() => clicked(id)}>
      <div className="contact__content">
        <p className="title">{name}</p>
      </div>
    </StyledChat>
  );
};

interface StyledChatProps {
  isActive: boolean;
}

const StyledChat = styled.div<StyledChatProps>`
  height: 70px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  background-color: ${({ isActive }) =>
    isActive ? baseTheme.colors.bg2 : "transparent"};
  gap: 20px;
  cursor: pointer;
  border-bottom: 1px solid ${baseTheme.colors.bg2};

  .image-container {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: #f0f0f0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .contact__content {
    .title {
      color: white;
      font-weight: bold;
      font-size: 20px;
    }

    .prev-message {
      color: ${baseTheme.colors.text.content};
      font-weight: 500;
    }
  }
`;
