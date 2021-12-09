import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaClipboard, FaHamburger, FaHistory} from 'react-icons/fa'
import Input from '../../../Components/Input';
import {useHistory} from 'react-router-dom';

const Sidebar: React.FC = () =>{
  const history = useHistory();

  return (
    <ProSidebar>
    <Menu iconShape="round">
      <MenuItem  icon={<FaClipboard size={28}/>}
        onClick={() => history.replace("/app")}>
        Pedidos
      </MenuItem>
      <MenuItem  icon={<FaHamburger size={28}/>}
        onClick={() => history.replace("/app/products")}>
        Produtos
      </MenuItem>
      <MenuItem  icon={<FaHistory size={28}/>}
        onClick={() => history.replace("/app/history")}>
        Historico
      </MenuItem>
      
    </Menu>
  </ProSidebar>
  )}

export default Sidebar;