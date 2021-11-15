import React, { useState } from 'react';
import { Container } from './styles';
import { Card, Button } from 'react-bootstrap';
import Input from '../../../../../../../Components/Input';

const Create: React.FC = () => {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  
  const [priceInPoints, setPriceInPoints] = useState('');
  const [priceInPointsError, setPriceInPointsError] = useState('');
  
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState('');

  return (
    <Container>
      <Card className="p-4 w-50">
        <Input 
          name="Nome" 
          placeholder="Nome" 
          value={name} 
          error={nameError} 
          onValueChange={(value) => setName(value)}/>

        <Input 
          name="Preço" 
          placeholder="Preço" 
          value={price} 
          error={priceError} 
          onValueChange={(value) => setPrice(value)}/>
         
        <Input 
          name="Preço em pontos" 
          placeholder="Preço em pontos" 
          value={priceInPoints} 
          error={priceInPointsError} 
          onValueChange={(value) => setPriceInPoints(value)}/>

        <Input 
          name="Imagem" 
          placeholder="Imagem" 
          type="file"
          value={image} 
          error={imageError} 
          onValueChange={(value) => setImage(value)}/>

        <Button variant="success">Salvar</Button>
      </Card>
    </Container>
  );
}

export default Create;