import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthActions, useAuthContext } from "../../context/auth-context";
import { useLoginMutation } from "../../generated/graphql";
import {
  AuthCard,
  AuthLink,
  FormInput,
  SubmitButton,
} from "../../components/authCard";
import { Spinner } from "../../components/ui/spinner";
import { USER_TOKEN_KEY } from "../../constants";

export const SignIn = () => {
  const [loginMutaion, { data, error, loading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authDispatch } = useAuthContext();
  const navigate = useNavigate();

  const onClickedHandler = () => {
    loginMutaion({
      variables: {
        email,
        password,
      },
      onCompleted: (complData) => {
        const { __typename, ...payload } = complData.login;
        authDispatch({ type: AuthActions.LOGIN, payload });
        window.localStorage.setItem(USER_TOKEN_KEY, complData.login.userToken);
        navigate("/");
      },
    });
  };

  return (
    <AuthCard submitted={onClickedHandler}>
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
      <SubmitButton>{loading ? <Spinner /> : "Войти"}</SubmitButton>
      <AuthLink to="/signup">Зарегистрироваться</AuthLink>
    </AuthCard>
  );
};
