import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';


const Navigation = () => (
    <div>
        <div className="logo">
            <h1>
                CRUD
            </h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
                <Link to="/clients">
                    <Icon type="user" />
                    <span className="nav-text">Clients</span>
                </Link>
            </Menu.Item>
        </Menu>
    </div>
);

export default Navigation;