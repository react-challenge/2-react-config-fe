import { Modal, Form, Input, message } from 'antd'
import { useState } from 'react';
import axiosApi from '../utils/axios'

export default function ShortLinkAdd({ isOpenEditDialog, setIsOpenEditDialog, editData, handleOk }) {
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const isEdit = JSON.stringify(editData) !== '{}'

    function handleCancel() {
        setIsOpenEditDialog(false)
    }

    async function confirm() {
        try {
            let formData = await form.validateFields()
            saveShortLink(formData)
        } catch (e) {
            console.log(e)
        }
    }

    const [saveLoading, setSaveLoading] = useState(false)
    async function saveShortLink({ shortLink, redirect }) {
        console.log("saveShortLink", form);
        try {
            setSaveLoading(true)
            // await new Promise((resolve) => setTimeout(resolve, 2000)); // sleep, test loading
            let apiLink = isEdit ? "/shortLink/edit" : "/shortLink/add";
            let payload = {
                shortLink,
                redirect
            }
            isEdit && (payload._id = editData._id)
            const res = await axiosApi.post(apiLink, payload);
            console.log(res)
            message.success(isEdit ? "修改成功！" : "添加成功！");
            handleOk && handleOk(isEdit)
            setIsOpenEditDialog(false)
        } catch (e) {
            console.error(e);
            message.error(e.message);
        } finally {
            setSaveLoading(false)
        }
    };

    return (
        <Modal title="短链接配置"
            open={isOpenEditDialog}
            onOk={confirm}
            onCancel={handleCancel}
            wrapClassName="sl-add-dialog"
            destroyOnClose={true}
            confirmLoading={saveLoading}
        >
            <Form
                form={form}
                labelCol={{ flex: '110px' }}
                labelWrap
                layout="horizontal"
                initialValues={{
                    shortLink: editData?.shortLink || '',
                    redirect: editData?.redirect || ''
                }}
            >
                <Form.Item name="shortLink" label="短链接" rules={[
                    {
                        required: true,
                        message: '请输入短连接',
                        whitespace: true
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item name="redirect" label="重定向地址" rules={[
                    {
                        required: true,
                        message: '请输入重定向地址',
                        whitespace: true
                    },
                ]}>
                    <TextArea rows={2} />
                </Form.Item>
            </Form>
        </Modal>
    )
}