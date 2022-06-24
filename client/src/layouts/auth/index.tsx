import { useState } from "react";
import styled from "styled-components";
import { baseTheme } from "../../theme/baseTheme";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <AuthBackground>
      <AuthForm>
        <AuthFormInner>
          <header>
            <h2>{isSignUp ? "Регистрация" : "Вход"}</h2>
          </header>
        </AuthFormInner>
      </AuthForm>
    </AuthBackground>
  );
};

const AuthBackground = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${baseTheme.colors.bg2};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthForm = styled.div`
  border-radius: 10px;
  width: 500px;
  padding: 20px;
  background-color: ${baseTheme.colors.bg3};

  @media (max-width: 520px) {
    width: 80%;
  }
`;

const AuthFormInner = styled.div``;
