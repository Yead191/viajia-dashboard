import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router-dom';
import { useForgetPasswordMutation } from '../../redux/apiSlices/authSlice';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [forgotPassword] = useForgetPasswordMutation();

    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values: any) => {
        try {
            toast.promise(forgotPassword(values).unwrap(), {
                loading: 'Sending code...',
                success: (res) => {
                    Cookies.set('resetEmail', values.email || '', {
                        expires: 1,
                        path: '/',
                    }); 
                    navigate('/verify-otp');
                    return <b>{res?.message}</b>;
                },
                error: (res) => `Error: ${res.data?.message || 'Something went wrong'}`,
            });
        } catch (error) {
            toast.error('Failed to send code');
        }
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
            <div className="flex  items-center justify-center h-screen p-5 " style={{}}>
                <div className="bg-[#1C1C1E] max-w-[630px] w-full  rounded-lg drop-shadow-2xl p-10 ">
                    <div className=" space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2 text-[#F1F1F1]">Forget Password</h1>
                        <p className=" text-gray-400">
                            Enter your email address to ger a verification code for resetting your password.
                        </p>
                    </div>

                    <Form
                        name="normal_ForgetPassword"
                        className="ForgetPassword-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="email" className="block text-primaryText mb-1 text-lg">
                                    Email
                                </label>
                            }
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input placeholder="Enter your email address" type="email" className="h-12" />
                        </Form.Item>

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
                                Send a code
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ForgetPassword;
