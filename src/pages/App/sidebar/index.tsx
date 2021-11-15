import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaHeart, FaHamburger} from 'react-icons/fa'
import Input from '../../../Components/Input';
import {useHistory} from 'react-router-dom';

const Sidebar: React.FC = () =>{
  const history = useHistory();

  return (
    <ProSidebar>
    <Menu iconShape="round">
      <MenuItem 
        icon={<FaHamburger size={28}/>}
        onClick={() => history.replace("/app/products")}
        >
          Produtos</MenuItem>
      <SubMenu title="Components" icon={<FaHeart />}>
        <MenuItem>Component 1</MenuItem>
        <MenuItem>Component 2</MenuItem>
        <Input value="15" onValueChange={(value) => {}} placeholder="aa" name="aa" error="aa"/>
      </SubMenu>
    </Menu>
  </ProSidebar>
  )}

export default Sidebar;