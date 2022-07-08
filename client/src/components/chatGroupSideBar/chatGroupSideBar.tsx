import styled from "styled-components";
import { useAppContext } from "../../context/app-context";
import { baseTheme } from "../../theme/baseTheme";
import { AddChatGroup } from "./addChatGroup";
import { ChatsGroup } from "./chatsGroup";

export const ChatGroupSideBar = () => {
  const { chatsGroups, chooseChatsGroup, chosenChatsGroup } = useAppContext();

  const onClickedHandler = (id: string) => {
    chooseChatsGroup(id);
  };

  return (
    <StyledSideBar>
      {chatsGroups.items &&
        chatsGroups.items.map((chatsGroup) => (
          <ChatsGroup
            key={chatsGroup.id}
            isActive={chosenChatsGroup === chatsGroup.id}
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
  padding: 10px 0;
  overflow: auto;
`;
