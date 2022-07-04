import styled from "styled-components";
import { baseTheme } from "../../../../theme/baseTheme";

interface ContactProps {
  name: string;
}

export const Contact = ({ name }: ContactProps) => {
  return (
    <StyledContact>
      <div className="contact__content">
        <p className="title">{name}</p>
      </div>
    </StyledContact>
  );
};

const StyledContact = styled.div`
  height: 70px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  border-bottom: 1px solid ${baseTheme.colors.line};

  .image-container {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: #f0f0f0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .contact__content {
    .title {
      color: white;
      font-weight: bold;
      font-size: 20px;
    }

    .prev-message {
      color: ${baseTheme.colors.text.content};
      font-weight: 500;
    }
  }
`;
