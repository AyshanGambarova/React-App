import React, {useEffect, useState} from 'react';
//Assets
import {Menu} from 'antd';
import {AppstoreOutlined, UserOutlined, HomeOutlined} from '@ant-design/icons';
//Router
import {Link, useLocation} from 'react-router-dom';

const {SubMenu} = Menu;

function Index() {
    //#region States

    const [current, setCurrent] = useState('');
    const location = useLocation();
    const items = [
        {
            label: 'Home',
            key: 'home',
            link: '/',
            icon: <HomeOutlined/>,
        },
        {
            label: 'Users',
            key: 'users',
            link: '/users',
            icon: <UserOutlined/>,
        },
        {
            label: 'Posts',
            key: 'posts',
            link: '/posts',
            icon: <AppstoreOutlined/>,
            disabled: false,
        },
    ];

    //#endregion

    //#region Functions

    const handleMenuClick = (e) => {
        setCurrent(e.key);
    };

    const renderSubMenu = (parentKey, icon, label, children) => (
        <SubMenu key={parentKey} icon={icon} title={label}>
            {children.map(childGroup => (
                <Menu.ItemGroup key={childGroup?.label} title={childGroup?.label}>
                    {childGroup?.children.map(child => (
                        <Menu.Item key={`${parentKey}-${child?.key}`} disabled={child?.disabled}>
                            <Link to={child?.link}>{child?.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu.ItemGroup>
            ))}
        </SubMenu>
    );

    //#endregion

    //#region Hooks

    useEffect(() => {
        const pathname = location.pathname;
        let newStr = pathname.replace(/\//g, '');
        if (newStr) {
            setCurrent(newStr);
        } else {
            setCurrent('home');
        }
    }, [location.pathname]);

    //#endregion

    return (
        <>
            <Menu mode="horizontal" selectedKeys={[current]} onClick={handleMenuClick}>
                {items.map(item => {
                    if (item?.children) {
                        return renderSubMenu(item.key, item.icon, item.label, item.children);
                    }
                    return (
                        <Menu.Item key={item?.key} icon={item?.icon} disabled={item?.disabled}>
                            <Link to={item?.link}>{item?.label}</Link>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </>
    );
}

export default Index;
