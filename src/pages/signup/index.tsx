import React, {useRef, useEffect, useCallback, useState} from 'react';
import {Card, Button, Form} from 'react-bootstrap';
import {Container, AnimationContainer, Center } from './styles';
import lottie from 'lottie-web';
import foodCarousel from '../../animations/food-carousel.json';
import Input from '../../Components/Input'
import {LinkContainer} from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import {useToast} from '../../hooks/toast';

const Signup: React.FC = () =>{
  
  const lottieDivRef = useRef(null);

  useEffect(() => {
    if(lottieDivRef.current != null){
      lottie.loadAnimation({
          container: lottieDivRef.current, // the dom element
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: foodCarousel, // the animation data
          });
    }
  }, [lottieDivRef])

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");
  

  const validateForm = useCallback((): boolean => {
    let hasError = false;
    
    if(!name){
      setNameError("Nome inválido");
      hasError = true;
    } else if(name.length < 3){
      setNameError("O nome precisa ter no mínimo 3 dígitos");
      hasError = true;
    } else {
      setNameError("");
    }

    if(!email){
      setEmailError("Email inválido");
      hasError = true;
    } else if(!email.includes("@")){
      setEmailError("Email inválido");
      hasError = true;
    } 
    else {
      setEmailError("");
    }

    if(!password){
      setPasswordError("Senha inválida");
      hasError = true;
    }else if (password.length < 6){
      setPasswordError("A senha precisa ter no mínimo 6 dígitos");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if(password !== passwordConfirmation){
      setPasswordConfirmationError("Senha e confirmação de senha são diferentes");
      hasError = true;
    } else{
      setPasswordConfirmationError("");
    }

    return !hasError;
  }, [email, name, password, passwordConfirmation]);

  const history = useHistory();
  const {addToast} = useToast();

  const handleFormSubmit = useCallback(() => {
    if(validateForm()){

        fetch("https://localhost:44342/register", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, email, password}),
          method: "POST"
          }) 
          .then(res => {
            console.log("essa é a resposta => ", res);
            if(res.status === 200){
              history.push("Signin");
              addToast({
                title: "Cadastrado com sucesso!",
                description: "Você já pode fazer login com suas credenciais",
                type: 'success'
              });
            }
            else{
              addToast({
                title: "Erro ao realizar cadastro!",
                description: "Ocorreu um erro ao realizar o cadastro, tente novamente mais tarde",
                type: 'danger'
              });
              console.log("erro => ", res);
            }
          })
          .catch(() => {
            addToast({
              title: "Erro ao realizar cadastro!",
              description: "Ocorreu um erro ao realizar o cadastro, tente novamente mais tarde",
              type: 'danger'
            })
          });
    }
  }
  , [addToast, email, history, name, password, validateForm]);


  return (
  <Container>
      <Card>
        <Card.Body className="d-flex justify-content-center row">
          
          <AnimationContainer className="col-md-12" ref={lottieDivRef} />
          
          <Form className="col-md-12" onSubmit={(form) => form.preventDefault()}>
            <Input 
              name="Nome"
              placeholder="Insira seu nome"
              value={name}
              onValueChange={(value) => setName(value)}
              error={nameError}
              />

            <Input 
              name="Endereço de email"
              placeholder="Insira seu email"
              value={email}
              onValueChange={(value) => setEmail(value)}
              error={emailError}
              />

            <Input 
              type="password"
              name="Senha"
              placeholder="Insira sua senha"
              value={password}
              onValueChange={(value) => setPassword(value)}
              error={passwordError}
              />

            <Input 
              type="password"
              name="Confirmação de senha"
              placeholder="Insira sua senha"
              value={passwordConfirmation}
              onValueChange={(value) => setPasswordConfirmation(value)}
              error={passwordConfirmationError}
              />

            <Center>
              <Button  
                variant="success" 
                type="submit" 
                style={{marginRight: 'auto', marginLeft: 'auto'}}
                onClick={handleFormSubmit}>
                Cadastrar
              </Button>
            </Center>
          </Form>

          <Center>
            <LinkContainer to="/signin">
                <Button variant="link"><small>Já possui uma conta? Faça login</small></Button>
              </LinkContainer>
          </Center>

        </Card.Body>
      </Card>
  </Container>)}

export default Signup;