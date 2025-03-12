import React, { useContext } from 'react';
import { Button, ConfigProvider, Space } from 'antd';
import vector1 from '../../assets/Vector.svg'
import AddIcon from '@mui/icons-material/Add';
import './index.css';

const Button1 = ({ action,group }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  
  return (
    <ConfigProvider>
      <Space>

        <Button
          type="primary"
          size="large"
          onClick={action}
          // className={`linear-gradient-button ${rootPrefixCls}-btn-primary`}

          className='topbutton-header'
        >
          <AddIcon color='white'/>
        <p className='button-text'> {group?"Add Group":"Add Task "}</p>
        </Button>
      </Space>
    </ConfigProvider>
  );
};

export default Button1;
