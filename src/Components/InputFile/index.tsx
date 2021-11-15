import React, { Ref }  from "react";
import { Form } from "react-bootstrap";
import {FormGroup as StyledFormGroup} from './styles';

interface InputProps {
  inputFileRef: Ref<HTMLInputElement>;
  error: string;
  name: string;
}

const Input: React.FC<InputProps> = ({inputFileRef, error, name}) => (
  <StyledFormGroup>
    <Form.Label>{name}</Form.Label>

    <Form.Control type="file" ref={inputFileRef} />
    
    {error && 
      <Form.Text className="text-danger">
        {error}
      </Form.Text>}
  </StyledFormGroup>
);

export default Input;