import {useState} from "react";
//Assets
import {Button, Form} from "antd";
//Components
import Create from './components/index'

function Index() {
    //#region States

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    //#endregion

    //#region Functions
    const showModal = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //#endregion
    return (
        <>
            <div className="p-4">Users page</div>
            <Button onClick={showModal}>Create user</Button>
            <Create
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                form={form}
            />
        </>
    )
}

export default Index;