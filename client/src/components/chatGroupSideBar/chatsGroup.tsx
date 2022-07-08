import styled from "styled-components";
import { baseTheme } from "../../theme/baseTheme";

interface ChatGroupProps {
  id?: string;
  clicked: (id: string) => void;
  imgUrl?: string | null;
  name: string;
  isActive?: boolean;
}

export const ChatsGroup = ({
  id,
  clicked,
  name,
  imgUrl,
  isActive,
}: ChatGroupProps) => {
  const onClickedHandler = () => {
    clicked(id || "");
  };

  return (
    <StyledChatsGroupContainer isActive={!!isActive}>
      <StyledChatsGroup onClick={onClickedHandler}>
        {imgUrl ? <img src={imgUrl} alt="" /> : <span>{name}</span>}
      </StyledChatsGroup>
    </StyledChatsGroupContainer>
  );
};

const StyledChatsGroup = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${baseTheme.colors.bg1};
  justify-content: center;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  font-weight: 500;
  color: ${baseTheme.colors.white};
  cursor: pointer;
`;

interface ChatsGroupContainerProps {
  isActive: boolean;
}

const StyledChatsGroupContainer = styled.div<ChatsGroupContainerProps>`
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 3px solid
    ${({ isActive }) => (isActive ? baseTheme.colors.white : "transparent")};
`;
