import styled from "styled-components";
import { Chat } from "../../components/chat";
import { ChatsSideBar } from "../../components/chatsSideBar";
import { Header } from "../../components/header";

export const MainLayout = () => {
  return (
    <MainWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <ChatsSideBar />
      <Chat />
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-template-rows: 80px 1fr;
`;

const HeaderWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 1 / 2;
`;
