import styled from "styled-components";
import { baseTheme } from "../../../../theme/baseTheme";

interface ChatsFooterControlProps {
  clicked: () => void;
  imgUrl?: string;
  title?: string;
}

export const ChatsFooterControl = ({
  clicked,
  imgUrl,
  title,
}: ChatsFooterControlProps) => {
  return (
    <StyledControl onClick={clicked}>
      {imgUrl && <img src={imgUrl} alt={title} />}
      {!imgUrl && title && <span>{title}</span>}
    </StyledControl>
  );
};

const StyledControl = styled.div`
  color: ${baseTheme.colors.white};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
`;
