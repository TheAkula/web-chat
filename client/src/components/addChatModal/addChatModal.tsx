import { FormEventHandler, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/app-context";
import { useModalContext } from "../../context/modal-context";
import { useCreateChatMutation } from "../../generated/graphql";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ModalHeader } from "../ui/modal";
import { Spinner } from "../ui/spinner";

export const AddChatModal = () => {
  const { close } = useModalContext();
  const { chosenChatsGroup } = useAppContext();
  const [createChatMutation, { loading, error, data }] =
    useCreateChatMutation();
  const [name, setName] = useState("");

  const onSubmitedHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    if (chosenChatsGroup && name) {
      await createChatMutation({
        variables: {
          chatsGroupId: chosenChatsGroup,
          name,
        },
      });
      close();
    }
  };

  return (
    <form onSubmit={onSubmitedHandler}>
      <ModalHeader title="Создать новый чат" />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название чата"
      />
      <SubmitButton type="submit">
        {loading ? <Spinner /> : "Создать"}
      </SubmitButton>
    </form>
  );
};

const SubmitButton = styled(Button)`
  margin: 0 auto;
  margin-top: 20px;
`;
