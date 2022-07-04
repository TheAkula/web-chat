import styled from "styled-components";
import { useAppContext } from "../../context/app-context";
import { baseTheme } from "../../theme/baseTheme";
import { AddChatGroup } from "./addChatGroup";
import { ChatsGroup } from "./chatsGroup";

export const ChatGroupSideBar = () => {
  const { chatsGroups } = useAppContext();

  const onClickedHandler = () => {};

  return (
    <StyledSideBar>
      {chatsGroups.items &&
        chatsGroups.items.map((chatsGroup) => (
          <ChatsGroup
            key={chatsGroup.id}
            {...chatsGroup}
            clicked={onClickedHandler}
          />
        ))}
      <AddChatGroup />
    </StyledSideBar>
  );
};

const StyledSideBar = styled.div`
  background-color: ${baseTheme.colors.bg2};
  padding: 10px;
`;
