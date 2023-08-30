import { Menu } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useHref } from "react-router-dom";

const menuItems = [
  { key: '/short-link', label: '短连接配置' },
  { key: '/api-mock', label: 'https接口Mock' },
]

export default function MenuLeft() {
  const navigate = useNavigate();
  const curHref = useHref()
  let activeKey = curHref === '/' ? '/short-link' : curHref

  const onClick = (e) => {
    console.log('click ', e);
    navigate(e.key)
  };

  useEffect(() => {
    if (curHref === '/') {
      navigate('/short-link')
    }
  })

  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={[activeKey]}
      mode="inline"
      items={menuItems}
      onClick={onClick}
    />
  );
}