import React  from "react";
import {FormGroup as StyledFormGroup} from './styles';
import {FormGroupProps} from 'react-bootstrap/FormGroup';

const FormGroup: React.FC<FormGroupProps> = (props) => (
  <StyledFormGroup {...props}/>
);

export default FormGroup;