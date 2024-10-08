import React, {useEffect} from "react";
import {Button, Col, Form, Input, Modal, notification, Radio, Row, Select} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {countries, genders} from "../../../../helpers/data";
import {apiCreateUser} from "../../../../apis";

function Index({isModalVisible, handleOk, handleCancel}) {
    //#region States

    const initialFormValues = {name: "", surname: "", country: "", gender: "", description: ""};

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        surname: Yup.string().required("Surname is required"),
        country: Yup.string().required("Country is required"),
        gender: Yup.string().required("Gender is required"),
        description: Yup.string().required("Description is required"),
    });

    const props = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        maxCount: 1,
        onChange(info) {
            if (info.file.status === 'done') {
                formik.setFieldValue("file", info.file)
            }
        },
    };

    //#endregion

    //#region Functions

    const handleSubmit = async (values, actions) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("surname", values.surname);
            formData.append("country", values.country);
            formData.append("gender", values.gender);
            formData.append("description", values.description);
            await apiCreateUser(formData)
            actions.setSubmitting(false);
            handleOk();
            notification.success({
                message: 'User created!',
                placement: 'topRight', // Set the placement to top right
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            actions.setSubmitting(false);
            notification.error({
                message: 'Failed to create user!',
                placement: 'topRight', // Set the placement to top right
            });

        }
    };

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    //#endregion

    //#region Hooks

    useEffect(() => {
        if (isModalVisible) {
            formik.resetForm({values: {...initialFormValues}});
        }
    }, [isModalVisible]);

    //#endregion

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
                    <Button
                        key="submit"
                        form="postForm"
                        htmlType="submit"
                        disabled={!formik.isValid}
                        onClick={formik.handleSubmit}
                    >
                        OK
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Row>
                        <Col span={12} className="px-3">
                            <Form.Item
                                label="Name"
                                validateStatus={formik.errors.name && formik.touched.name ? "error" : ""}
                                help={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                            >
                                <Input
                                    name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12} className="px-3">
                            <Form.Item
                                label="Surname"
                                validateStatus={formik.errors.surname && formik.touched.surname ? "error" : ""}
                                help={formik.errors.surname && formik.touched.surname ? formik.errors.surname : null}
                            >
                                <Input
                                    name="surname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.surname}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12} className="px-3">
                            <Form.Item
                                label="Country"
                                validateStatus={formik.errors.country && formik.touched.country ? "error" : ""}
                                help={formik.errors.country && formik.touched.country ? formik.errors.country : null}
                            >
                                <Select
                                    name="country"
                                    onChange={(value) => formik.setFieldValue("country", value)}
                                    onBlur={formik.handleBlur}
                                    onSelect={formik.handleChange}
                                    value={formik.values.country}
                                >
                                    {countries.map((country) => (
                                        <Select.Option key={country.key} value={country.value}>
                                            {country.value}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12} className="px-3">
                            <Form.Item
                                label="Gender"
                                validateStatus={formik.errors.gender && formik.touched.gender ? "error" : ""}
                                help={formik.errors.gender && formik.touched.gender ? formik.errors.gender : null}
                            >
                                <Radio.Group
                                    name="gender"
                                    onChange={(e) => formik.setFieldValue("gender", e.target.value)}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.gender}
                                >
                                    {genders.map((gender) => (
                                        <Radio key={gender.value} value={gender.value}>
                                            {gender.label}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={12} className="px-3">
                            <Form.Item
                                label="Description"
                                validateStatus={formik.errors.description && formik.touched.description ? "error" : ""}
                                help={formik.errors.description && formik.touched.description ? formik.errors.description : null}
                            >
                                <Input.TextArea
                                    name="description"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}

export default Index;
