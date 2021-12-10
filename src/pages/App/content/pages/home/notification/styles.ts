import styled from "styled-components";
import { Button as BootstrapButton, ButtonProps} from 'react-bootstrap';

export const Customer = styled.p`
  margin-bottom: 10px;
`;

export const Points = styled.p`
  margin-bottom: 10px;
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