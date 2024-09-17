import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
//APIs
import {apiDeletePost, apiPosts} from "../../apis";
//Assets
import {Button, Table, notification} from "antd";
import {DeleteOutlined} from '@ant-design/icons';
//Components
import Create from './components/CreateUser'
// Helpers
import {getTableHeight} from '../../helpers/index'
import modalHelper from '../../helpers/modal';

function Index() {
    //#region States
    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({
        hideOnSinglePage: false,
        size: 'normal',
        pageSizeOptions: ['10', '20', '25', '50', '100'],
        showSizeChanger: true,
        current: 1,
        pageSize: 20,
        total: 100,
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60
        },
        {
            title: 'UserID',
            dataIndex: 'userId',
            key: 'userId',
            width: 80
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Body',
            dataIndex: 'body',
            key: 'body',
        },
        {
            title: 'Action',
            key: 'actions',
            width: 100,
            render: (text, record) => (
                <Button shape="circle" onClick={() => handleDeletingUser(record.id)} icon={<DeleteOutlined/>}></Button>
            )
        }
    ];


    //#endregion

    //#region Functions

    const fetchData = async (payload) => {
        try {
            setLoading(true)
            const data = await apiPosts(payload);
            setPosts(data)
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

    const handleTableChange = (pagination) => {
        console.log(pagination)
        fetchData({_page: pagination.current, _limit: pagination.pageSize})
        setPagination(pagination)
        navigate(`/users?_page=${pagination.current}&_limit=${pagination.pageSize}`)
    };

    const handleDeletingUser = (id) => {
        modalHelper.warning({
            title: "Are you sure to delete user?",
            onOk: () => handleDeleteUser(id)
        })
    };
    const handleDeleteUser = async (id) => {
        await apiDeletePost(id)
        await fetchData()
        notification.success({
            message: "User deleted successfully.",
            closeIcon: ''
        })
    };

    //#endregion

    //#region Hooks

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData({_page: pagination.current});
    }, [pagination.current]);

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
            <Table
                columns={columns}
                dataSource={posts.map(post => ({...post, key: post.id}))}
                loading={loading}
                scroll={{
                    x: '100%',
                    y: getTableHeight(),
                }}
                pagination={posts?.length ? pagination : false}
                onChange={handleTableChange}
            >
            </Table>


        </div>
    )
}

export default Index;