import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
//Assets
import {Button, Dropdown, Menu, notification, Table, Tooltip} from "antd";
import {MoreOutlined} from '@ant-design/icons';
//Components
import Create from './components/CreateUser';
import {apiPosts} from "../../apis";
// Helpers
import {getTableHeight, modalHelper} from '../../helpers/index';

function Index() {
    //#region States
    const [searchParams, setSearchParams] = useSearchParams(); // for handling query parameters

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});
    const {Column} = Table;
    const [pagination, setPagination] = useState({
        hideOnSinglePage: false,
        size: 'normal',
        pageSizeOptions: ['10', '20', '25', '50', '100'],
        showSizeChanger: true,
        current: parseInt(searchParams.get('_page')) || 1,
        pageSize: parseInt(searchParams.get('_limit')) || 10,
        total: 100, // Placeholder, should be fetched dynamically
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
            fixed: 'left',
            sorter: (record1, record2) => record1.id > record2.id
        },
        {
            title: 'UserID',
            dataIndex: 'userId',
            key: 'userId',
            width: 80,
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
            ellipsis: {
                showTitle: false,
            },
            render: body => (
                <Tooltip placement="topLeft" title={body}>
                    {body}
                </Tooltip>
            ),
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            width: 100,
            render: (text, record) => (
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key="1">
                                <Link to={`/posts/${record?.id}`}>Ətraflı</Link>
                            </Menu.Item>
                            <Menu.Item key="2" disabled>Redaktə et</Menu.Item>
                            <Menu.Item onClick={() => handleClickDeletingPost(record)} key="3">Sil</Menu.Item>
                        </Menu>
                    }
                >
                    <Button className="w-full" type="link"><MoreOutlined/></Button>
                </Dropdown>
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

    const handleClickDeletingPost = (post) => {
        setSelectedPost({...post});
        modalHelper.warning({
            title: 'Postu silmək istədiyinizdən əminsinizmi?',
            onOk: handleClickDeletePost
        });
    }

    const handleClickDeletePost = () => {
        try {
            // await apiOrganizationsDelete(selectedOrganization.value?.id!)
            // await fetchOrganizations()
            notification.success({
                message: 'Post silindi!',
                placement: 'topRight',
            });
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
        console.log(pagination);
        fetchData({_page: pagination.current, _limit: pagination.pageSize});
        setPagination(pagination);
        setSearchParams({_page: pagination.current, _limit: pagination.pageSize});
    };

    //#endregion

    //#region Hooks

    useEffect(() => {
        fetchData({_page: pagination.current, _limit: pagination.pageSize});
    }, [pagination.current, pagination.pageSize]);

    useEffect(() => {
        console.log(searchParams.get('_page'), searchParams.get('_limit'));
        const parsedPage = parseInt(searchParams.get('_page'));
        const parsedLimit = parseInt(searchParams.get('_limit'));

        setPagination(prevPagination => ({
            ...prevPagination,
            current: isNaN(parsedPage) ? 1 : parsedPage,
            pageSize: isNaN(parsedLimit) ? 10 : parsedLimit,
            total: 100 // Assuming total should always be 100
        }));
    }, [searchParams]);

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
            />
        </div>
    );
}

export default Index;
