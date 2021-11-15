import React  from "react";
import { Form } from "react-bootstrap";
import {FormGroup as StyledFormGroup} from './styles';

interface InputProps {
  type?: string;
  name: string;
  placeholder: string;
  value: string;
  onValueChange: (newValue: string) => void;
  error: string;
}

const Input: React.FC<InputProps> = ({type, name, placeholder, value, onValueChange, error}) => (
  <StyledFormGroup>
    <Form.Label>{name}</Form.Label>
    
    <Form.Control type={type ?? "text"} placeholder={placeholder} 
      value={value} onChange={(event) => onValueChange(event.target.value)} />
    
    {error && 
      <Form.Text className="text-danger">
        {error}
      </Form.Text>}
  </StyledFormGroup>
);

export default Input;