import { useState } from "react";
import { FormInput } from "../formInput";

export const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <FormInput
        placeholder="Имя"
        curValue={firstName}
        changed={(s: string) => setFirstName(s)}
      />
      <FormInput
        placeholder="Фамилия"
        curValue={lastName}
        changed={(s: string) => setLastName(s)}
      />
      <FormInput
        placeholder="Email"
        type="email"
        curValue={email}
        changed={(s: string) => setEmail(s)}
      />
      <FormInput
        placeholder="Пароль"
        type="password"
        curValue={password}
        changed={(s: string) => setPassword(s)}
      />
    </form>
  );
};
