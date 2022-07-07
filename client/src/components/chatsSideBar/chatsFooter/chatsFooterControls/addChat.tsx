import { useModalContext } from "../../../../context/modal-context";
import { AddChatModal } from "../../../addChatModal/addChatModal";
import { ChatsFooterControl } from "./chatsFooterControl";

export const AddChat = () => {
  const { show } = useModalContext();

  const onClickedHandler = () => {
    show(<AddChatModal />);
  };

  return <ChatsFooterControl title="+" clicked={onClickedHandler} />;
};
