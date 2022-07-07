import { useAppContext } from "../../../context/app-context";
import { Chat } from "./chat";

export const ChatsList = () => {
  const { chats, chooseChat, chosenChat } = useAppContext();

  return (
    <div>
      {chats.items &&
        chats.items.map((c) => (
          <Chat
            key={c.id}
            {...c}
            clicked={chooseChat}
            isActive={c.id === chosenChat}
          />
        ))}
    </div>
  );
};
