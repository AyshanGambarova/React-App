import styles from "./style.module.css";
import React, {useState} from 'react';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';

const {SubMenu} = Menu;

function Index({text}) {
    //#region States

    const [current, setCurrent] = useState('mail');
    const items = [
        {
            label: 'Navigation One',
            key: 'mail',
            link: '/navigation-one',
            icon: <MailOutlined/>,
        },
        {
            label: 'Navigation Two',
            key: 'two',
            link: '/navigation-two',
            icon: <AppstoreOutlined/>,
            disabled: false,
        },
        {
            label: 'Navigation Three - Submenu',
            key: 'SubMenu',
            icon: <SettingOutlined/>,
            children: [
                {
                    type: 'group',
                    label: 'Item 1',
                    children: [
                        {
                            label: 'Option 1',
                            key: 'setting-1',
                            link: '/test-1',
                        },
                        {
                            label: 'Option 2',
                            key: 'setting-2',
                            link: '/test-2',
                        },
                    ],
                },
                {
                    type: 'group',
                    label: 'Item 2',
                    children: [
                        {
                            label: 'Option 3',
                            key: 'setting-3',
                            link: '/test-3',
                        },
                        {
                            label: 'Option 4',
                            key: 'setting-4',
                            link: '/test-4',
                        },
                    ],
                },
            ],
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
            <div className="p-4">{text}</div>
        </>
    );
}

export default Index;
