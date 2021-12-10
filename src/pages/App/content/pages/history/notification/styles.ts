import styled from "styled-components";
import { Button as BootstrapButton, ButtonProps} from 'react-bootstrap';

export const Name = styled.p`
  margin-bottom: 10px;
  margin-right: 20px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

export const Button = styled(BootstrapButton)<ButtonProps>`
  & + button {
    margin-left: 20px;
  }
`;