import styled from 'styled-components';
import { Card, Button as BootstrapButton } from 'react-bootstrap';

export const Container = styled(Card)`
  width: 300px;
  margin-right: 20px;

  img {
    height: 160px;
  }
`;

export const InfoContainer = styled.div`
  padding: 10px;
`;

export const Button = styled(BootstrapButton)`
  margin: 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    padding-right: 5px;
    width: 28px;
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;