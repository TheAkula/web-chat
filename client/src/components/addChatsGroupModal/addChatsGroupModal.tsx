import { FormEventHandler, useState } from "react";
import styled from "styled-components";
import { useCreateChatsGroupMutation } from "../../generated/graphql";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ModalHeader } from "../ui/modal";
import { Spinner } from "../ui/spinner";

export const AddChatsGroupModal = () => {
  const [name, setName] = useState("");
  const [createChatsGroupMutation, { loading, error, data }] =
    useCreateChatsGroupMutation();

  const onSubmitedHandler: FormEventHandler = (e) => {
    e.preventDefault();
    createChatsGroupMutation({
      variables: {
        name,
      },
    });
  };

  return (
    <form onSubmit={onSubmitedHandler}>
      <ModalHeader title="Создать новую группу" />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название группы"
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
