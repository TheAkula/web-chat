import styled from "styled-components";
import { baseTheme } from "../../../theme/baseTheme";

export const ProfileIcon = () => {
  return (
    <ProfileIconContainer>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        alt=""
      />
    </ProfileIconContainer>
  );
};

const ProfileIconContainer = styled.div`
  width: 53px;
  height: 53px;
  background-color: ${baseTheme.colors.text.content};
  border: 3px solid #25c716;
  margin-left: auto;
  cursor: pointer;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
`;
