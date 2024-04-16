import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
//Assets
import {Button, Table} from "antd";
//Components
import Create from './components/CreateUser'
import {apiPosts} from "../../apis";
// Helpers
import {getTableHeight} from '../../helpers/index'

function Index() {
    //#region States
    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const {Column} = Table;
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
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            width: 100,
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

    //#endregion

    //#region Hooks

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Simulated API call to fetch data
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
                dataSource={posts}
                loading={loading}
                scroll={{
                    x: '100%',
                    y: getTableHeight(),
                }}
                pagination={posts?.length ? pagination : false}
                onChange={handleTableChange}

            >
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Button>Edit</Button>
                    )}
                />
            </Table>

        </div>
    )
}

export default Index;