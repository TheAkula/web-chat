import { useAppContext } from "../../../context/app-context";
import { Contact } from "./contact";

export const ContactsList = () => {
  const { chats } = useAppContext();

  return (
    <div>
      {chats.items && chats.items.map((c) => <Contact key={c.id} {...c} />)}
    </div>
  );
};
