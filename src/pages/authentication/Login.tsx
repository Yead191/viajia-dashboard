import { Button, Checkbox, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/apiSlices/authSlice';
import { toast } from 'sonner';
import Cookies from "js-cookie";

export type errorType = {
    data: {
        errorMessages: { message: string }[];
        message: string;
    };
};
const Login = () => {
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const onFinish: FormProps<FieldNamesType>['onFinish'] = async (values: any) => {
        const user = {
            email: values.email,
            password: values.password,
        };
        toast.promise(login(user).unwrap(), {
            loading: 'Logging in...',
            success: (res) => {
                navigate('/');
                Cookies.set('accessToken', res?.data?.createToken || '');
                Cookies.set('refreshToken', res?.data?.refreshToken || '');
                localStorage.removeItem('resetToken');
                return <b>{res.message}</b>;
            },
            error: (error) => {
                return error?.data?.message ? <b>{error.data.message}</b> : 'Login Failed';
            },
        });
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00BCD1',
                    colorBgContainer: '#0A0B0D',
                },
                components: {
                    Input: {
                        borderRadius: 10,
                        colorBorder: 'transparent',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: 'transparent',
                    },
                },
            }}
        >
            <div className="flex items-center justify-center p-5 h-screen  ">
                <div className="bg-[#1C1C1E] max-w-[630px] w-full rounded-lg drop-shadow-2xl p-10 ">
                    <div className=" space-y-5 !pb-3 text-center">
                        <h1 className="text-3xl text-[#F1F1F1]  font-medium text-center mt-2">Login to Account!</h1>
                        <p className="text-xl text-gray-400">Please enter your email and password to continue</p>
                    </div>

                    <Form
                        name="normal_login"
                        className="login-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="email" className="block text-[#F1F1F1] mb-1 text-lg">
                                    Email
                                </label>
                            }
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                placeholder="Enter your email address"
                                type="email"
                                className=" h-12  px-6 placeholder-[#ABABAB]"
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-[#F1F1F1] mb-1 text-lg">
                                    Password
                                </label>
                            }
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password
                                placeholder="Enter your password"
                                className=" h-12  px-6 !placeholder-[#ABABAB]"
                            />
                        </Form.Item>

                        <div className="flex items-center justify-between mb-4">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className="text-[#F1F1F1] text-lg">Remember me</Checkbox>
                            </Form.Item>
                            <Link to="/forget-password" className="text-[#00BCD1] text-md hover:text-[#00BCD1]/90">
                                Forget password
                            </Link>
                        </div>

                        <Form.Item>
                            <Button
                                className="!bg-[#00BCD1] border-0"
                                htmlType="submit"
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                    color: '#fff',
                                    fontSize: 20,
                                }}
                                // onClick={() => navigate('/')}
                            >
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Login;
