import React, {useEffect} from "react";
import {Button, Col, Form, Input, Modal, notification, Row} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useParams} from "react-router-dom";
import {useMutation} from "react-query";
import {apiCreatePost} from "../../../../apis";

function Index({isModalVisible, handleOk, handleCancel}) {
    const {id} = useParams();
    const initialFormValues = {title: "", body: ""};

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        body: Yup.string().required("Body is required"),
    });
    const createPostMutation = useMutation(apiCreatePost);

    const handleSubmit = async (values, actions) => {
        try {
            actions.setSubmitting(true);
            await createPostMutation.mutateAsync({...values, userId: id});
            handleOk();
            notification.success({
                message: 'Post created!',
                placement: 'topRight',
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            notification.error({
                message: 'Failed to create post!',
                placement: 'topRight',
            });
        } finally {
            actions.setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        formik.resetForm({values: {...initialFormValues}});
    }, [isModalVisible]);


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
                        disabled={!formik.isValid || createPostMutation.isLoading}
                        onClick={formik.handleSubmit}
                    >
                        {createPostMutation.isLoading ? 'Creating...' : 'OK'}
                    </Button>,
                ]}
            >
                <Form layout="vertical" id="postForm">
                    <Row>
                        <Col span={12} className="px-3">
                            <Form.Item
                                label="Title"
                                validateStatus={formik.errors.title && formik.touched.title ? "error" : ""}
                                help={formik.errors.title && formik.touched.title ? formik.errors.title : null}
                            >
                                <Input
                                    name="title"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12} className="px-3">
                            <Form.Item
                                label="Body"
                                validateStatus={formik.errors.body && formik.touched.body ? "error" : ""}
                                help={formik.errors.body && formik.touched.body ? formik.errors.body : null}
                            >
                                <Input
                                    name="body"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.body}
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
