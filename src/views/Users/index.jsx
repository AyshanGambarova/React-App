import {useEffect, useState} from "react";
//Assets
import {Button, Table} from "antd";
//Components
import Create from './components/CreateUser'
import {apiUsers} from "../../apis";
// Helpers
import {getTableHeight} from '../../helpers/index'

function Index() {
    //#region States

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
        },
    ];
    const pagination = {
        current: 1,
        pageSize: 10,
        total: users.length,
    };

    //#endregion

    //#region Functions

    const fetchData = async () => {
        try {
            setLoading(true)
            const data = await apiUsers();
            setUsers(data)
            setLoading(false)
        } catch (error) {
            //
        }
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //#endregion

    //#region Hooks

    useEffect(() => {
        fetchData();
    }, []);

    //#endregion

    return (
        <div className="p-4">
            <div className="flex justify-end items-center mb-4">
                <Button onClick={showModal}>Create User</Button>
            </div>
            <Create
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
            <Table columns={columns} dataSource={users} loading={loading}
                   scroll={{
                       x: '100%',
                       y: getTableHeight(),
                   }}
            />

        </div>
    )
}

export default Index;