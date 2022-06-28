import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthActions, useAuthContext } from "../../context/auth-context";
import { useSignUpMutation } from "../../generated/graphql";
import {
  AuthCard,
  AuthLink,
  FormInput,
  SubmitButton,
} from "../../components/authCard";
import { Spinner } from "../../components/ui/spinner";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpMutation, { loading, error, data }] = useSignUpMutation();
  const { authDispatch } = useAuthContext();
  const navigate = useNavigate();

  const onClickedHandler = () => {
    signUpMutation({
      variables: {
        firstName,
        lastName,
        email,
        password,
      },
      onCompleted: (complData) => {
        const { __typename, ...payload } = complData.signUp;
        authDispatch({ type: AuthActions.SIGNUP, payload });
        navigate("/");
      },
    });
  };

  return (
    <AuthCard submitted={onClickedHandler}>
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
      <SubmitButton>
        {loading ? <Spinner /> : "Зарегистрироваться"}
      </SubmitButton>
      <AuthLink to="/signin">Войти</AuthLink>
    </AuthCard>
  );
};
