import React from 'react';
import {Container } from './styles';
import Sidebar from './sidebar';
import ContentRoutes from './content/routes';

const Index: React.FC = () => {
  
  return (
    <Container>
      <Sidebar />
      <ContentRoutes />
    </Container>
  );
};

export default Index;