import { useModalContext } from "../../context/modal-context";
import { AddChatsGroupModal } from "../addChatsGroupModal/addChatsGroupModal";
import { ChatGroup } from "./chatGroup";

export const AddChatGroup = () => {
  const { show } = useModalContext();

  const onAddedChatGroup = () => {
    show(<AddChatsGroupModal />);
  };

  return <ChatGroup title="+" clicked={onAddedChatGroup} />;
};
