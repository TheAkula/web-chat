import styled from "styled-components";
import { ChatsSideBar } from "../../components/chatsSideBar";

export const MainLayout = () => {
  return (
    <MainWrapper>
      <ChatsSideBar />
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  height: 100vh;
`;
