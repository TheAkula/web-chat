import styled from "styled-components";
import { Contact as ContactType } from "../../../../types";

export const Contact = ({
  imageUrl,
  title,
  notReadMessagesAmount,
  prevMessage,
}: ContactType) => {
  return (
    <StyledContact>
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>
      <div className="contact__content">
        <p className="title">{title}</p>
        <p className="prev-message">{prevMessage.content}</p>
      </div>
    </StyledContact>
  );
};

const StyledContact = styled.div`
  height: 70px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  gap: 20px;

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
      color: #c2c2c2;
      font-weight: 500;
    }
  }
`;
