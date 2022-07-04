import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LocalStorageKeys } from "../constants";
import {
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
  const { userToken } = useAuthContext();

  const [chosenChatsGroup, setChosenChatsGroup] = useState("");
  const [chosenChat, setChosenChat] = useState("");
  const [chatMessagesQuery, chatMessages] = useMessagesLazyQuery();
  const [myChatsQuery, myChats] = useMyChatsLazyQuery();
  const [myChatsGroupsQuery, myChatsGroups] = useMyChatsGroupsLazyQuery();

  useEffect(() => {
    if (userToken) {
      myChatsGroupsQuery({
        onCompleted: (complData) => {
          const chatsGroupId =
            localStorage.getItem(LocalStorageKeys.CHOSEN_CHATS_GROUP) ||
            complData.myChatsGroups[0].id;
          setChosenChatsGroup(chatsGroupId);
          localStorage.setItem(
            LocalStorageKeys.CHOSEN_CHATS_GROUP,
            chatsGroupId
          );
          myChatsQuery({
            variables: {
              id: chatsGroupId,
            },
            onCompleted: (chats) => {
              const chatId =
                localStorage.getItem(LocalStorageKeys.CHOSEN_CHAT) ||
                chats.chats[0].id;
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
    }
  }, [userToken, chatMessagesQuery, myChatsGroupsQuery, myChatsQuery]);

  useEffect(() => {
    console.log("update");
    if (userToken && chosenChat) {
      console.log("call");
      chatMessages.subscribeToMore<MessageCreatedSubscription>({
        document: MessageCreatedDocument,
        variables: {
          id: chosenChat,
        },
        onError(error) {
          console.log(error);
        },
        updateQuery: (prev, { subscriptionData }) => {
          console.log(subscriptionData.data);
          console.log(prev);
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
  }, [userToken, chosenChat]);

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

export const useAppContext = () => useContext(AppContext);
