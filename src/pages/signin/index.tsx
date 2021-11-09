import React, {useRef, useEffect, useState, useCallback} from 'react';
import {Card, Button, Form} from 'react-bootstrap';
import {Container, AnimationContainer, Center } from './styles';
import lottie from 'lottie-web';
import foodCarousel from '../../animations/food-carousel.json';
import Input from '../../Components/Input';
import {LinkContainer} from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import {useAuth} from '../../hooks/auth';

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

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = useCallback((): boolean => {
    let hasError = false;
    
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

    return !hasError;
  }, [email, password]);

  const history = useHistory();
  const {addToast} = useToast();
  const { signIn } = useAuth();

  const handleFormSubmit = useCallback(async (): Promise<void> => {
    if(validateForm()){
      try{
        await signIn({email, password});
        history.push("Dashboard");
      } catch{
        addToast({
          title: "Erro ao realizar login!",
          description: "Ocorreu um erro ao realizar o login, tente novamente mais tarde",
          type: 'danger'
        });
      }
    }
  }
  , [addToast, email, history, password, signIn, validateForm]);

  return (
  <Container>
      <Card>
        <Card.Body className="d-flex justify-content-center row">
          
          <AnimationContainer className="col-md-12" ref={lottieDivRef} />
          
          <Form className="col-md-12" onSubmit={(form) => form.preventDefault()}>
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

            <Center>
              <Button variant="success" type="submit" style={{marginRight: 'auto', marginLeft: 'auto'}}
                onClick={handleFormSubmit}>
                Logar
              </Button>
            </Center>

          </Form>

          <Center>
            <LinkContainer to="/signup">
                <Button variant="link"><small>Não possui uma conta? Cadastre-se</small></Button>
              </LinkContainer>
          </Center>

        </Card.Body>
      </Card>
  </Container>)}

export default Signup;