import React, { useCallback, useRef, useState } from 'react';
import { Container } from './styles';
import { Card, Button } from 'react-bootstrap';
import Input from '../../../../../../../Components/Input';
import InputFile from '../../../../../../../Components/InputFile';
import api, { getError } from '../../../../../../../services/api';
import { useToast } from '../../../../../../../hooks/toast';
import { useHistory } from 'react-router-dom';

const Create: React.FC = () => {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  
  const [priceInPoints, setPriceInPoints] = useState('');
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

      if(imageInputRef.current?.files?.length === 0)
      {
        setImageError("Selecione um arquivo");
        hasErrors = true;
      } else {
        setImageError("");
      }

    return !hasErrors;
  }, [name, price, priceInPoints])

  const { addToast } = useToast();

  const history = useHistory();

  const handleFormSubmit = useCallback(() => {
    if(isValid()){
      try{
        if(imageInputRef.current && imageInputRef.current.files){

          const file = imageInputRef.current.files[0];
  
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
          api.post("products", {
                                  name, 
                                  price, 
                                  priceInPoints, 
                                  base64Image: (reader.result as string)
                                }
                  ).then(() => {
                    addToast({type: 'success', title: "Sucesso", description: "Produto adicionado com sucesso"});
                    history.goBack();
                  });                  
          };
          reader.onerror = function (error) {
              console.log("aaa")
              addToast({type: 'danger', title: "Erro", description: "Ocorreu um erro ao ler imagem"});
          };
        }
      }
      catch (error){
        addToast({type: 'danger', title: "Erro", description: getError(error)});
      }
    }
    else{
      console.log("não é valido")
    }
  }, [isValid, name, price, priceInPoints, addToast, history])

  return (
    <Container>
      <Card className="p-4 w-50">
        <h2 className="mb-2">Cadastrar produto</h2>

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
          name="Imagem"
          inputFileRef={imageInputRef}
          error={imageError} />

        <Button variant="success" onClick={handleFormSubmit}>Salvar</Button>
      </Card>
    </Container>
  );
}

export default Create;