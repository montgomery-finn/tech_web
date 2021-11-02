import React, {useRef, useEffect} from 'react';
import {Card, Button, Form} from 'react-bootstrap';
import {Container, AnimationContainer, Center } from './styles';
import lottie from 'lottie-web';
import foodCarousel from '../../animations/food-carousel.json';
import FormGroup from '../../Components/FormGroup';
import {LinkContainer} from 'react-router-bootstrap';

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

  
  return (
  <Container>
      <Card>
        <Card.Body className="d-flex justify-content-center row">
          
          <AnimationContainer className="col-md-12" ref={lottieDivRef} />
          
          <Form className="col-md-12">
            <FormGroup>
              <Form.Label>Endereço de email</Form.Label>
              <Form.Control type="email" placeholder="Insira seu email" />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Insira sua senha" />
            </FormGroup>

            <Center>
              <Button variant="success" type="submit" style={{marginRight: 'auto', marginLeft: 'auto'}}>
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