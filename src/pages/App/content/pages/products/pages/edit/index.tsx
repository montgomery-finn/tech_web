import React, { useCallback, useRef, useState } from 'react';
import { Container } from './styles';
import { Card, Button } from 'react-bootstrap';
import Input from '../../../../../../../Components/Input';
import InputFile from '../../../../../../../Components/InputFile';
import api from '../../../../../../../services/api';
import { useToast } from '../../../../../../../hooks/toast';
import { useHistory, useLocation } from 'react-router-dom';
import ProductDTO from '../../DTOs/productDTO';

const Edit: React.FC = () => {

  const { state } = useLocation();
  const product = (state as any).product as ProductDTO;

  const [name, setName] = useState(product.name);
  const [nameError, setNameError] = useState('');
  
  const [price, setPrice] = useState(`${product.price}`);
  const [priceError, setPriceError] = useState('');
  
  const [priceInPoints, setPriceInPoints] = useState(`${product.priceInPoints}`);
  const [priceInPointsError, setPriceInPointsError] = useState('');
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState('');

  const isValid = useCallback((): boolean => {
    let hasErrors = false;
      
      if(!name){
        setNameError("Nome obrigatório");
        hasErrors = true;
      } else{
        setNameError("")
      }

      if(!price){
        setPriceError("Preço obrigatório");
        hasErrors = true;
      } else{
        setPriceError("");
      }

      if(!priceInPoints){
        setPriceInPointsError("Preço em pontos obrigatório");
        hasErrors = true;
      } else {
        setPriceInPointsError("")
      }


    return !hasErrors;
  }, [name, price, priceInPoints])

  const { addToast } = useToast();

  const handleFormSubmit = useCallback(async () => {
    if(isValid()){
      try{
        let file: File | null = null;

        if(imageInputRef.current && imageInputRef.current.files){
          file = imageInputRef.current.files[0];
        }
  
        if(file){
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
          api.put("products", {
                                id: product.id,
                                name, 
                                price, 
                                priceInPoints, 
                                base64Image: (reader.result as string)
                              }
                  ).then(() => {
                    addToast({type: 'success', title: "Sucesso", description: "Produto editado com sucesso"});
                  });                  
            };
            reader.onerror = function (error) {
                console.log("aaa")
                addToast({type: 'danger', title: "Erro", description: "Ocorreu um erro ao ler imagem"});
            };
        }
        else {
          await api.put("products", {
              id: product.id,
              name, 
              price, 
              priceInPoints,
            }
          ).then(() => {
          addToast({type: 'success', title: "Sucesso", description: "Produto editado com sucesso"});
          });          
        }

        
      }
      catch{
        addToast({type: 'danger', title: "Erro", description: "Ocorreu um erro ao editar produto"});
      }
    }
    else{
      console.log("não é valido")
    }
  }, [isValid, product.id, name, price, priceInPoints, addToast])

  return (
    <Container>
      <Card className="p-4 w-50">
        <h2 className="mb-2">Editar produto</h2>

        <Input 
          name="Nome" 
          placeholder="Nome" 
          value={name} 
          error={nameError} 
          onValueChange={(value) => setName(value)}/>

        <Input 
          name="Preço" 
          placeholder="Preço" 
          type="number"
          value={price} 
          error={priceError} 
          onValueChange={(value) => setPrice(value)}/>
         
        <Input 
          name="Preço em pontos" 
          placeholder="Preço em pontos" 
          type="number"
          value={priceInPoints} 
          error={priceInPointsError} 
          onValueChange={(value) => setPriceInPoints(value)}/>

        <InputFile 
          name="Substituir imagem"
          inputFileRef={imageInputRef}
          error={imageError} />

        <Button variant="success" onClick={handleFormSubmit}>Salvar</Button>
      </Card>
    </Container>
  );
}

export default Edit;