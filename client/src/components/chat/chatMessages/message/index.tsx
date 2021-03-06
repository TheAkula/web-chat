import styled from "styled-components";
import { baseTheme } from "../../../../theme/baseTheme";

interface MessageProps {
  author: string;
  content: string;
}

export const Message = ({ author, content }: MessageProps) => {
  return (
    <StyledMessage>
      <span className="author">{author}</span>
      <p className="content">{content}</p>
    </StyledMessage>
  );
};

const StyledMessage = styled.div`
  padding: 10px 15px;
  background-color: #464646;
  border-radius: 10px;
  width: fit-content;
  max-width: 70%;
  margin-bottom: 15px;

  .author {
    font-weight: bold;
    font-size: 16px;
    color: ${baseTheme.colors.text.author};
    display: inline-block;
    margin-bottom: 10px;
  }

  .content {
    font-size: 18px;
    color: ${baseTheme.colors.text.content};
  }
`;
