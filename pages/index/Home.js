/**
 * Created by linyuhua on 2017/5/12.
 */
import React from 'react'
import { Layout, Menu, Tabs, Form, Icon, Input, Checkbox, Button, Message } from 'antd'

const { Header, Content, Footer } = Layout
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class App extends React.Component {
    state = {
        confirmDirty: false
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">login</Menu.Item>
                        <Menu.Item key="2">article</Menu.Item>
                        <Menu.Item key="3">editor</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Tabs defaultActiveKey="2" size="small">
                            <TabPane tab="登录" key="1">
                                <div style={{ width: "280px", margin: "0 auto" }}>
                                    <Form>
                                        <FormItem>
                                            {getFieldDecorator('userName', {
                                                rules: [{ required: true, message: '请您输入账号名称！' }],
                                            })(
                                                <Input addonBefore={<Icon type="user" />} placeholder="请您输入用户名称！" />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('password', {
                                                rules: [
                                                    { required: true, message: '请您输入账号密码！' }],
                                            })(
                                                <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请您输入账号密码" />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('remember', {
                                                valuePropName: 'checked',
                                                initialValue: true,
                                            })(
                                                <Checkbox>Remember me</Checkbox>
                                            )}
                                            <a  href="" style={{float: 'right'}}>Forgot password</a>
                                            <Button type="primary" htmlType="submit" style={{width: '100%'}} >
                                                Log in
                                            </Button>
                                            Or <a href="">register now!</a>
                                        </FormItem>
                                    </Form>
                                </div>
                            </TabPane>
                            <TabPane tab="注册" key="2">
                                <div style={{ width: "450px", margin: "0 auto" }}>
                                    <Form>
                                        <FormItem
                                            {...formItemLayout}
                                            label="username"
                                            hasFeedback
                                        >
                                            {getFieldDecorator('username', {
                                                rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                                            })(
                                                <Input />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="Password"
                                            hasFeedback
                                        >
                                            {getFieldDecorator('password', {
                                                rules: [
                                                    { required: true, message: 'Please input your password!', whitespace: true },
                                                    {
                                                        validator: this.checkConfirm,
                                                    }
                                                ],
                                            })(
                                                <Input type="password"/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="Confirm Password"
                                            hasFeedback
                                        >
                                            {getFieldDecorator('confirm', {
                                                rules: [
                                                    { required: true, message: 'Please Confirm Password!', whitespace: true },
                                                    {
                                                        validator: this.checkPassword
                                                    }
                                                ],
                                            })(
                                                <Input type="password" onBlur={this.handleConfirmBlur}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="E-mail"
                                            hasFeedback
                                        >
                                            {getFieldDecorator('email', {
                                                rules: [{
                                                    type: 'email', message: 'The input is not valid E-mail!',
                                                }, {
                                                    required: true, message: 'Please input your E-mail!',
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </FormItem>
                                        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                                            {getFieldDecorator('agreement', {
                                                valuePropName: 'checked',
                                            })(
                                                <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                                            )}
                                        </FormItem>
                                        <FormItem {...tailFormItemLayout}>
                                            <Button type="primary" htmlType="submit" size="large">Register</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Node-Login ©2017 Created by linwalker
                </Footer>
            </Layout>
        )
    }
}

export default Form.create()(App);