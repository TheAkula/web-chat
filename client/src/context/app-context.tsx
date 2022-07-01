import { createContext, ReactNode, useMemo, useState } from "react";
import { LocalStorageKeys } from "../constants";
import {
  Message,
  MessagesQuery,
  MyChatsGroupsQuery,
  MyChatsQuery,
  useMessagesLazyQuery,
  useMyChatsGroupsQuery,
  useMyChatsLazyQuery,
} from "../generated/graphql";

interface ContextChatsGroups {
  items?: MyChatsGroupsQuery["myChatsGroups"];
}

interface ContextChats {
  items?: MyChatsQuery["chats"];
}

interface ContextMessages {
  items?: MessagesQuery["messages"];
}

interface AppContextState {
  chatsGroups: ContextChatsGroups;
  chats: ContextChats;
  messages: ContextMessages;
}

type AppContextValue = AppContextState & {
  chosenChatsGroup: string | null;
  chosenChat: string | null;
};

const initialState: AppContextState = {
  chatsGroups: {},
  chats: { items: [] },
  messages: { items: [] },
};

const AppContext = createContext<AppContextValue>({
  ...initialState,
  chosenChat: null,
  chosenChatsGroup: null,
});

interface Props {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
  const [chosenChatsGroup, setChosenChatsGroup] = useState(
    localStorage.getItem(LocalStorageKeys.CHOSEN_CHATS_GROUP)
  );
  const [chosenChat, setChosenChat] = useState(
    localStorage.getItem(LocalStorageKeys.CHOSEN_CHAT)
  );
  const [chatMessagesQuery, chatMessages] = useMessagesLazyQuery();
  const [myChatsQuery, myChats] = useMyChatsLazyQuery();
  const myChatsGroups = useMyChatsGroupsQuery({
    onCompleted: (complData) => {
      const chatsGroupId = chosenChatsGroup || complData.myChatsGroups[0].id;
      setChosenChatsGroup(chatsGroupId);
      localStorage.setItem(LocalStorageKeys.CHOSEN_CHATS_GROUP, chatsGroupId);
      myChatsQuery({
        variables: {
          id: chatsGroupId,
        },
        onCompleted: (chats) => {
          const chatId = chosenChat || chats.chats[0].id;
          setChosenChat(chatId);
          localStorage.setItem(LocalStorageKeys.CHOSEN_CHAT, chatId);
          chatMessagesQuery({
            variables: {
              id: chatId,
            },
          });
        },
      });
    },
  });

  const value: AppContextValue = useMemo(
    () => ({
      chatsGroups: {
        items: myChatsGroups.data?.myChatsGroups,
      },
      chats: {
        items: myChats.data?.chats,
      },
      messages: {
        items: chatMessages.data?.messages,
      },
      chosenChat,
      chosenChatsGroup,
    }),
    [chatMessages, myChatsGroups, myChats, chosenChat, chosenChatsGroup]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
