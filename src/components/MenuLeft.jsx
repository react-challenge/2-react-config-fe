import { Menu } from 'antd';

export default function MenuLeft() {

  const menuItems = [
    { key: 'short-link', label: '短连接配置' },
    { key: 'api-mock', label: 'https接口Mock' },
  ]

  return (
    // onClick={onClick}
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['short-link']}
      mode="inline"
      items={menuItems}
    />
  );
}