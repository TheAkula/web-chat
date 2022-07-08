import {
  createContext,
  memo,
  ReactNode,
  useCallback,
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
  Exact,
  MessageCreatedDocument,
  MessageCreatedSubscription,
  MessagesQuery,
  MyChatsGroupsQuery,
  MyChatsQuery,
  useMessagesLazyQuery,
  useMyChatsGroupsLazyQuery,
  useMyChatsLazyQuery,
} from "../generated/graphql";
import { useAuthContext } from "./auth-context";

type ContextDataField<T extends any[]> = {
  items?: T;
  loading: boolean;
};

interface AppContextState {
  chatsGroups: ContextDataField<MyChatsGroupsQuery["myChatsGroups"]>;
  chats: ContextDataField<MyChatsQuery["chats"]>;
  messages: ContextDataField<MessagesQuery["messages"]>;
}

type AppContextValue = AppContextState & {
  chosenChatsGroup: string | null;
  chosenChat: string | null;
  chooseChat: (c: string) => void;
  chooseChatsGroup: (c: string) => void;
};

const initialState: AppContextState = {
  chatsGroups: {
    loading: false,
  },
  chats: { items: [], loading: false },
  messages: { items: [], loading: false },
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
  const { userToken, id } = useAuthContext();

  const [chosenChatsGroup, setChosenChatsGroup] = useState("");
  const [chosenChat, setChosenChat] = useState("");
  const [chatMessagesQuery, chatMessages] = useMessagesLazyQuery();
  const [myChatsQuery, myChats] = useMyChatsLazyQuery();
  const [myChatsGroupsQuery, myChatsGroups] = useMyChatsGroupsLazyQuery();
  const [isSubscribedMessages, setIsSubscribedMessages] = useState(false);
  const [isSubscribedChats, setIsSubscribedChats] = useState(false);

  useEffect(() => {
    async function initApp() {
      const myChatsGroupsData = await myChatsGroupsQuery();
      const chatsGroupId =
        localStorage.getItem(LocalStorageKeys.CHOSEN_CHATS_GROUP) ||
        myChatsGroupsData.data?.myChatsGroups[0].id ||
        "";
      if (!chatsGroupId) return;
      setChosenChatsGroup(chatsGroupId);
      localStorage.setItem(LocalStorageKeys.CHOSEN_CHATS_GROUP, chatsGroupId);
      myChatsGroupsData.subscribeToMore<
        ChatsGroupCreatedSubscription,
        Exact<{ userId: string }>
      >({
        document: ChatsGroupCreatedDocument,
        variables: {
          userId: id || "",
        },
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
    }
    if (userToken && id) {
      initApp();
    }
  }, [userToken, myChatsGroupsQuery, myChatsQuery, chatMessagesQuery, id]);

  useEffect(() => {
    let promise;
    if (chosenChatsGroup) {
      promise = myChatsQuery({
        variables: {
          id: chosenChatsGroup,
        },
      });
    }
    if (!isSubscribedChats && chosenChatsGroup) {
      setIsSubscribedChats(true);
      promise?.then((data) => {
        const chatId =
          localStorage.getItem(chosenChatsGroup) ||
          data.data?.chats[0].id ||
          "";
        if (!chatId) return;
        setChosenChat(chatId);
        data.subscribeToMore<
          ChatCreatedSubscription,
          Exact<{ userId: string }>
        >({
          document: ChatCreatedDocument,
          variables: {
            userId: id || "",
          },
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
      });
    }
  }, [chosenChatsGroup, myChatsQuery, isSubscribedChats, id]);

  useEffect(() => {
    let promise;
    if (chosenChat) {
      promise = chatMessagesQuery({
        variables: {
          id: chosenChat,
        },
      });
    }
    if (!isSubscribedMessages && chosenChat) {
      setIsSubscribedMessages(true);
      promise?.then((data) =>
        data.subscribeToMore<
          MessageCreatedSubscription,
          Exact<{ userId: string }>
        >({
          document: MessageCreatedDocument,
          variables: {
            userId: id || "",
          },
          onError(error) {
            console.log(error);
          },
          updateQuery: (prev, { subscriptionData }) => {
            if (subscriptionData.data && subscriptionData.data.messageCreated) {
              console.log(subscriptionData.data.messageCreated);
              const newMessages = prev.messages
                ? prev.messages.concat(subscriptionData.data.messageCreated)
                : [subscriptionData.data.messageCreated];
              return {
                ...prev,
                messages: newMessages,
              };
            }
            return prev;
          },
        })
      );
    }
  }, [chosenChat, chatMessagesQuery, isSubscribedMessages, id]);

  const chooseChat = useCallback(
    (chosen: string) => {
      setChosenChat(chosen);
      localStorage.setItem(chosenChatsGroup, chosen);
    },
    [chosenChatsGroup]
  );

  const chooseChatsGroup = (chosen: string) => {
    setChosenChatsGroup(chosen);
    setChosenChat(localStorage.getItem(chosen) || "");
  };

  const value: AppContextValue = useMemo(
    () => ({
      chatsGroups: {
        items: myChatsGroups.data?.myChatsGroups,
        loading: myChatsGroups.loading,
      },
      chats: {
        items: myChats.data?.chats,
        loading: myChats.loading,
      },
      messages: {
        items: chatMessages.data?.messages,
        loading: chatMessages.loading,
      },
      chosenChat,
      chosenChatsGroup,
      chooseChat,
      chooseChatsGroup,
    }),
    [
      chatMessages,
      myChatsGroups,
      myChats,
      chosenChat,
      chosenChatsGroup,
      chooseChat,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});

export const useAppContext = () => useContext(AppContext);
