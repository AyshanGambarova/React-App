import {ExclamationCircleOutlined, InfoCircleOutlined} from '@ant-design/icons';
import {Modal} from "antd";

export default {
    error: (payload) => {
        Modal.error({
            icon: ExclamationCircleOutlined,
            centered: true,
            title: payload.title,
            content: payload?.content,
            okType: 'default',
            okText: 'Bağla'
        })
    },
    info: (payload) => {
        Modal.confirm({
            icon: InfoCircleOutlined,
            centered: true,
            title: payload.title,
            content: payload?.content,
            onOk: payload.onOk,
            class: 'modal-info',
            width: payload.width
        })
    },
    warning: (payload) => {
        Modal.confirm({
            icon: ExclamationCircleOutlined,
            centered: true,
            title: payload?.title,
            content: payload.content,
            onOk: payload.onOk,
            okButtonProps: {
                danger: true
            },
            class: 'modal-error'
        })
    }
}