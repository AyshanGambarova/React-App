import {Button, Modal} from "antd";
import React from "react";

function Index({isModalVisible, handleOk, handleCancel}) {

    return (
        <>
            <Modal
                title="Create Post"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" danger onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" htmlType="submit" onClick={handleOk}
                    >
                        OK
                    </Button>
                ]}
            >
            </Modal>
        </>
    )
}

export default Index;