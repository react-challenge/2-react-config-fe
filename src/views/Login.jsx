import { Button, Form, Input, message } from 'antd';
import '../styles/login.scss'
import axiosApi from '../utils/axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const accountInfo = {}
    const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
    const navigate = useNavigate()

    // rules 初步校验通过后 submit 逻辑
    const onFinish = async (values) => {
        console.log('Success:', values); // {name: 'qqe', password: 'sf'}
        let form = values
        //  登录
        try {
            setLoading(true)
            // await new Promise((resolve) => setTimeout(resolve, 2000)); // sleep, test loading
            const res = await axiosApi.post("/user/login", {
                name: form.name,
                password: form.password,
            });
            console.log(res);
            if (res.code === 0) {
                message.success("登录成功");
                Object.assign(accountInfo, res.data); // 将用户信息/token 写入 pinia 状态管理
                localStorage.setItem("config-fe-token", res?.data?.token); // 防止刷新页面后 token 丢失
                navigate('/')
            }
        } catch (e) {
            console.error(e);
            message.error(e.message);
        } finally {
            setLoading(false)
        }
    };
    // 校验失败调用
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <div className="tips">游客体验账号: 用户名 admin, 密码 admin</div>
            {loading}
            {/* {accountInfo} */}
            <div className="login-view">
                <Form
                    {...formItemLayout}
                    layout="horizontal"
                    form={form}
                    // initialValues={{ layout: formLayout }}
                    initialValues={{
                        name: 'admin',
                        password: 'admin'
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item name="name" label="用户名" rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}>
                        <Input placeholder="input username" />
                    </Form.Item>
                    <Form.Item name="password" label="密码" rules={[
                        {
                            required: true,
                            message: 'Please input your passowrd!',
                        },
                    ]}>
                        <Input placeholder="input password" type="password" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                        <Button type="primary" htmlType='submot'>登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}