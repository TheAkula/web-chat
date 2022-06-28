import { FormEventHandler } from "react";
import styled from "styled-components";
import { baseTheme } from "..//../theme/baseTheme";

interface AuthProps {
  children: React.ReactNode;
  submitted: () => void;
}

export const AuthCard = ({ children, submitted }: AuthProps) => {
  const onSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    submitted();
  };

  return (
    <AuthBackground>
      <AuthForm>
        <form onSubmit={onSubmitHandler}>{children}</form>
      </AuthForm>
    </AuthBackground>
  );
};

const AuthBackground = styled.div`
  height: 100vh;
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

  header {
    h2 {
      color: ${baseTheme.colors.text.content};
      text-align: center;
    }
  }

  @media (max-width: 520px) {
    width: 80%;
  }
`;
