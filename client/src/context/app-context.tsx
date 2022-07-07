import {
  createContext,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LocalStorageKeys } from "../constants";
import {
  ChatCreatedDocument,
  ChatCreatedSubscription,
  ChatsGroupCreatedDocument,
  ChatsGroupCreatedSubscription,
  MessageCreatedDocument,
  MessageCreatedSubscription,
  MessagesQuery,
  MyChatsGroupsQuery,
  MyChatsQuery,
  useMessageCreatedSubscription,
  useMessagesLazyQuery,
  useMyChatsGroupsLazyQuery,
  useMyChatsLazyQuery,
} from "../generated/graphql";
import { useAuthContext } from "./auth-context";

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
  chooseChat: (c: string) => void;
  chooseChatsGroup: (c: string) => void;
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
  chooseChat: () => {},
  chooseChatsGroup: () => {},
});

interface Props {
  children: ReactNode;
}

export const AppContextProvider = memo(({ children }: Props) => {
  const { userToken } = useAuthContext();

  const [chosenChatsGroup, setChosenChatsGroup] = useState("");
  const [chosenChat, setChosenChat] = useState("");
  const [chatMessagesQuery, chatMessages] = useMessagesLazyQuery();
  const [myChatsQuery, myChats] = useMyChatsLazyQuery();
  const [myChatsGroupsQuery, myChatsGroups] = useMyChatsGroupsLazyQuery();

  useEffect(() => {
    async function initApp() {
      const myChatsGroupsData = await myChatsGroupsQuery();
      const chatsGroupId =
        localStorage.getItem(LocalStorageKeys.CHOSEN_CHATS_GROUP) ||
        myChatsGroupsData.data?.myChatsGroups[0].id ||
        "";
      setChosenChatsGroup(chatsGroupId);
      localStorage.setItem(LocalStorageKeys.CHOSEN_CHATS_GROUP, chatsGroupId);
      myChatsGroupsData.subscribeToMore<ChatsGroupCreatedSubscription>({
        document: ChatsGroupCreatedDocument,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data.chatsGroupCreated) {
            return prev;
          }

          return {
            ...prev,
            myChatsGroups: [
              ...prev.myChatsGroups,
              subscriptionData.data.chatsGroupCreated,
            ],
          };
        },
      });
      const myChatsQueryData = await myChatsQuery({
        variables: {
          id: chatsGroupId,
        },
      });
      const chatId =
        localStorage.getItem(LocalStorageKeys.CHOSEN_CHAT) ||
        myChatsQueryData.data?.chats[0].id ||
        "";
      setChosenChat(chatId);
      localStorage.setItem(LocalStorageKeys.CHOSEN_CHAT, chatId);
      myChatsQueryData.subscribeToMore<ChatCreatedSubscription>({
        document: ChatCreatedDocument,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data.chatCreated) {
            return prev;
          }
          return {
            ...prev,
            chats: [...prev.chats, subscriptionData.data.chatCreated],
          };
        },
      });
      const chatMessagesQueryData = await chatMessagesQuery({
        variables: {
          id: chatId,
        },
      });

      chatMessagesQueryData.subscribeToMore<MessageCreatedSubscription>({
        document: MessageCreatedDocument,
        onError(error) {
          console.log(error);
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (subscriptionData.data && subscriptionData.data.messageCreated) {
            const newMessages = prev.messages
              ? prev.messages.concat(subscriptionData.data.messageCreated)
              : [subscriptionData.data.messageCreated];
            return {
              ...prev,
              messages: newMessages,
            };
          }
          return {
            ...prev,
            messages: prev.messages,
          };
        },
      });
    }
    if (userToken) {
      initApp();
      console.log("some");
    }
    return;
  }, [userToken, myChatsGroupsQuery, myChatsQuery, chatMessagesQuery]);

  const chooseChat = (chosen: string) => {
    setChosenChat(chosen);
  };

  const chooseChatsGroup = (chosen: string) => {
    setChosenChatsGroup(chosen);
  };

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
      chooseChat,
      chooseChatsGroup,
    }),
    [chatMessages, myChatsGroups, myChats, chosenChat, chosenChatsGroup]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});

export const useAppContext = () => useContext(AppContext);
