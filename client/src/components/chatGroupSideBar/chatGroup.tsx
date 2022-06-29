import styled from "styled-components";
import { baseTheme } from "../../theme/baseTheme";

interface ChatGroupProps {
  chatGroupId: string;
  clicked: (id: string) => void;
  imgUrl?: string;
  title: string;
}

export const ChatGroup = ({
  chatGroupId,
  clicked,
  title,
  imgUrl,
}: ChatGroupProps) => {
  const onClickedHandler = () => {
    clicked(chatGroupId);
  };

  return (
    <StyledChatGroup onClick={onClickedHandler}>
      {imgUrl ? <img src={imgUrl} alt="" /> : <span>{title}</span>}
    </StyledChatGroup>
  );
};

const StyledChatGroup = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${baseTheme.colors.bg1};
  justify-content: center;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: ${baseTheme.colors.white};
  cursor: pointer;
`;
