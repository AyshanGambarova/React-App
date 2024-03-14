import React, {useEffect, useState} from 'react';
//Assets
import {Button, Checkbox, Col, Form, Input, message, Modal, Radio, Row, Select, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

const Index = ({isModalVisible, handleOk, handleCancel, form}) => {

    const [selectedOption, setSelectedOption] = useState(['jack']);
    const [radio, setRadio] = useState(1);
    const [agreeChecked, setAgreeChecked] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);

    const [options, setOptions] = useState([
        {key: 'AF', value: 'Afghanistan'},
        {key: 'AL', value: 'Albania'},
        {key: 'DZ', value: 'Algeria'},
        {key: 'AD', value: 'Andorra'},
        {key: 'AO', value: 'Angola'},
        {key: 'AR', value: 'Argentina'},
        {key: 'AM', value: 'Armenia'},
        {key: 'AU', value: 'Australia'},
        {key: 'AT', value: 'Austria'},
        {key: 'AZ', value: 'Azerbaijan'},
        {key: 'BS', value: 'Bahamas'},
        {key: 'BH', value: 'Bahrain'},
        {key: 'BD', value: 'Bangladesh'},
        {key: 'BB', value: 'Barbados'},
        {key: 'BY', value: 'Belarus'}
    ]);
    const [radioGroupOptions, setRadioGroupOptions] = useState([{
        value: 'male',
        label: 'Male'
    }, {
        value: 'female',
        label: 'Female'
    }
    ])

    const props = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                // console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setFileUploaded(true);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                setFileUploaded(false);
            } else if (info.file.status === 'removed') {
                setFileUploaded(false); // Reset fileUploaded state when file is removed
            }
        },
    };

    const handleAgreeChange = e => {
        setAgreeChecked(e.target.checked);
    };
    const handleSubmit = async () => {
        await form.validateFields((errors, values) => {
            if (!errors && agreeChecked) { // Check if there are no errors and agree checkbox is checked
                // Send data to server
                sendFormData(values);
                form.resetFields();
                handleOk(); // Call handleOk from parent component
            } else {
                console.log('Validation failed or agreement not checked!');
            }
        });
    };
    const sendFormData = formData => {
        // Replace the URL below with your actual server endpoint
        // const url = 'https://example.com/api/submitFormData';
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             console.log('Form data sent successfully');
        //         } else {
        //             console.error('Error sending form data:', response.statusText);
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error sending form data:', error);
        //     });
        console.log(formData)

    };
    //#region Hooks
    useEffect(() => {
        if (isModalVisible) {
            setAgreeChecked(false)
            setFileUploaded(false)
        }
    }, [isModalVisible]);

    // useEffect(() => {
    //     if (isModalVisible) {
    //         form.validateFields().then(() => {
    //             setIsFormValid(true);
    //         }).catch(() => {
    //             setIsFormValid(false);
    //         });
    //     }
    // }, [isModalVisible, form.getFieldsValue()]);


    useEffect(() => {
        setIsFormValid(form.isFieldsTouched(true) && form.getFieldsError().filter(({errors}) => errors.length).length === 0);
    }, [isModalVisible, form.getFieldsValue()]);


    //#endregion
    return (
        <Modal
            title="Create User"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" danger onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" htmlType="submit" onClick={handleSubmit}
                        disabled={!agreeChecked || !isFormValid}>
                    OK
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{required: true, message: 'Please input your name!'},
                                {whitespace: true},
                                {min: 3}
                            ]}
                            hasFeedback
                        >
                            <Input placeholder="Type your name"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Surname"
                            name="surname"
                            rules={[{required: true, message: 'Please input your surname!'}, {whitespace: true},
                                {min: 3}]}
                            hasFeedback
                        >
                            <Input placeholder="Type your surname"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item

                            label="Country"
                            name="country"
                            rules={[{required: true, message: 'Please select your country!'}]}
                            hasFeedback
                        >
                            <Select
                                className="w-full"
                                mode="multiple"
                                value={selectedOption}
                                onChange={selectedValues => setSelectedOption(selectedValues)}
                            >
                                {options.map(option => (
                                    <Select.Option key={option.key} value={option.value}>
                                        {option.value}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Gender"
                            name="gender"
                            rules={[{required: true, message: 'Please select your gender!'}]}

                        >
                            <Radio.Group value={radio} onChange={e => setRadio(e.target.value)}>
                                {radioGroupOptions.map(option => (
                                    <Radio.Button key={option.value} value={option.value}>
                                        {option.label}
                                    </Radio.Button>
                                ))}
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Description"
                            name="description"
                            hasFeedback
                            rules={[{required: true, message: 'Please input your description!'}]}
                        >
                            <Input.TextArea rows={4} placeholder="Type your description..."/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Profile photo"
                            name="profilePhoto"
                            rules={[{required: true, message: 'Please upload a profile photo!'}]}
                        >
                            <Upload  {...props}>
                                <Button disabled={fileUploaded} icon={<UploadOutlined/>}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Checkbox checked={agreeChecked} onChange={handleAgreeChange}>I agree to the terms and
                            conditions</Checkbox>
                    </Col>
                </Row>

            </Form>
        </Modal>
    );
};

export default Index;
