import { Button, ConfigProvider, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useResetPasswordMutation } from '../../redux/apiSlices/authSlice';
import Cookies from 'js-cookie';
const NewPassword = () => {
    const navigate = useNavigate();
    // const searchParams = new URLSearchParams(window.location.search);
    // const token = searchParams.get("token");
    const [resetPassword] = useResetPasswordMutation();

    const onFinish = async (values: { password: string; confirmPassword: string }) => {
        console.log(values);
        // navigate('/login');
        toast.promise(resetPassword(values).unwrap(), {
            loading: 'Resetting password...',
            success: (res) => {
                // console.log(res);
                Cookies.remove('resetEmail');
                Cookies.remove('resetToken');
                navigate('/login');
                return <b>{res.message}</b>;
            },
            error: (res) => `Error: ${res.data?.message || 'Something went wrong'}`,
        });
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '',

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
            <div className="flex items-center justify-center h-screen p-5 " style={{}}>
                <div className="bg-[#1C1C1E] max-w-[630px] w-full drop-shadow-2xl p-10 ">
                    <div className=" max-w-md mx-auto space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2 text-[#F1F1F1]">Set a new password</h1>
                        <p className="text-gray-600">
                            Create a new password. Ensure it differs from previous ones for security
                        </p>
                    </div>

                    <Form
                        name="normal_NewPassword"
                        className="NewPassword-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    New Password
                                </label>
                            }
                            name="newPassword"
                            rules={[{ required: true, message: 'Please input new password!' }]}
                        >
                            <Input.Password placeholder="KK!@#$15856" className=" h-12 px-6" />
                        </Form.Item>
                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    Confirm Password
                                </label>
                            }
                            name="confirmPassword"
                            rules={[
                                { required: true, message: 'Please input confirm password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (value && value !== getFieldValue('newPassword')) {
                                            return Promise.reject(
                                                new Error('The two passwords that you entered do not match!'),
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className="!bg-[#00bcd1] border-0"
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
                                Update Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default NewPassword;
