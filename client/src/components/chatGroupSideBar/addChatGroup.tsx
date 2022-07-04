import { useModalContext } from "../../context/modal-context";
import { AddChatsGroupModal } from "../addChatsGroupModal/addChatsGroupModal";
import { ChatsGroup } from "./chatsGroup";

export const AddChatGroup = () => {
  const { show } = useModalContext();

  const onAddedChatGroup = () => {
    show(<AddChatsGroupModal />);
  };

  return <ChatsGroup name="+" clicked={onAddedChatGroup} />;
};
