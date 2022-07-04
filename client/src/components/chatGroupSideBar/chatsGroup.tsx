import styled from "styled-components";
import { baseTheme } from "../../theme/baseTheme";

interface ChatGroupProps {
  chatGroupId?: string;
  clicked: (id?: string) => void;
  imgUrl?: string | null;
  name: string;
}

export const ChatsGroup = ({
  chatGroupId,
  clicked,
  name,
  imgUrl,
}: ChatGroupProps) => {
  const onClickedHandler = () => {
    clicked(chatGroupId);
  };

  return (
    <StyledChatsGroup onClick={onClickedHandler}>
      {imgUrl ? <img src={imgUrl} alt="" /> : <span>{name}</span>}
    </StyledChatsGroup>
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
