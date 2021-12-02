import React, { useCallback, useState } from 'react';
import { Container, InfoContainer, ButtonsContainer, Button } from './styles';
import ProductDTO from '../../../DTOs/productDTO';
import { Image, Modal } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import api from '../../../../../../../../services/api';
import { useToast } from '../../../../../../../../hooks/toast';
import { useHistory } from 'react-router';

interface ItemProps {
  product: ProductDTO;
}

const Item: React.FC<ItemProps> = ({product}) => {

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const { addToast } = useToast();
  
  const history = useHistory();

  const handleDelete = useCallback(async () => {
    try{
      await api.delete(`/products/${product.id}`);
      setDeleteModalVisible(false);
      addToast({type: 'success', title: "Sucesso", description: "Produto removido com sucesso"});
      history.go(0)
    }
    catch {
      addToast({type: 'danger', title: "Erro", description: "Ocorreu um erro ao remover produto"});
    }
  }, [addToast, history, product.id]);


  return (
    <>
      <Container>
        <Image fluid src={`http://localhost:28464/image/${product.fileName}`}/>
        <InfoContainer>
          <span>{product.name}</span><br/>
          <span>Preço: R$ {product.price}</span><br/>
          <span>Preço em pontos: {product.priceInPoints}</span><br/>
          <ButtonsContainer>
            <Button 
              variant="warning" 
              onClick={() => history.push("/app/products/edit", {product})}
              ><FaEdit /> Editar</Button>
            <Button 
              variant="danger" 
              onClick={() => setDeleteModalVisible(true)}
              >
                <FaTrashAlt />
                Excluir
              </Button>
          </ButtonsContainer>
        </InfoContainer>
    </Container>

    <Modal show={deleteModalVisible} onHide={() => setDeleteModalVisible(false)}>
      <Modal.Header closeButton className="bg-danger">
        <Modal.Title className="text-light">Atenção!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Tem certeza que deseja excluir o produto "{product.name}"?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setDeleteModalVisible(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};

export default Item;