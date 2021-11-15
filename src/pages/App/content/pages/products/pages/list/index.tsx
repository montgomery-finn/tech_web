import React, { useEffect, useState } from 'react';
import { Container, ItensContainer } from './styles';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../../../../../../services/api';
import { useToast } from '../../../../../../../hooks/toast';
import ProductDTO from '../../DTOs/productDTO';
import Item from './item';


const List: React.FC = () => {
  const history = useHistory();

  const { addToast } = useToast();

  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    async function getDate(){
      try{
        const response = await api.get<ProductDTO[]>("products");
  
        setProducts(response.data);
      } catch{
        addToast({type: 'danger', title: "Erro", description: "Ocorreu um erro ao recuperar os produtos"})
      }
    }

    getDate();
    
  }, [addToast]);

  return (
    <Container>
      <h2>Produtos</h2>

      <Button onClick={() => history.push("products/create")}>Adicionar produto</Button>

      <ItensContainer>
        {products.map((product) => (
          <Item product={product} key={product.id} />
        ))}
      </ItensContainer>
    </Container>
  );
}

export default List;