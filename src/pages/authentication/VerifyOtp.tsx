import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../../utils/local-storage';
import Cookies from 'js-cookie';
import { useForgetPasswordMutation, useOtpVerifyMutation } from '../../redux/apiSlices/authSlice';
import { toast } from 'sonner';
export type errorType = {
    data: {
        errorMessages: { message: string }[];
        message: string;
    };
};

type VerifyOtpFormValues = {
    otp: string;
};

const VerifyOtp = () => {
    const navigate = useNavigate();
    const email = getFromLocalStorage('forgetEmail');
    const [forgotPassword] = useForgetPasswordMutation();
    const [verifyOtp] = useOtpVerifyMutation();

    const onFinish: FormProps<VerifyOtpFormValues>['onFinish'] = (values) => {
        const email = Cookies.get('resetEmail') || '';
        const verificationData = {
            email: email,
            oneTimeCode: parseInt(values.otp),
        };
        // console.log(verificationData)
        try {
            toast.promise(verifyOtp(verificationData).unwrap(), {
                loading: 'Verifying code...',
                success: (res) => {
                    // console.log(res.data);
                    Cookies.set('resetToken', res?.data || '', {
                        expires: 1,
                        path: '/',
                    });
                    navigate('/new-password');
                    return <b>{res.message}</b>;
                },
                error: (res) => `Error: ${res.data?.message || 'Something went wrong'}`,
            });
        } catch (error) {
            toast.error('Failed to verify OTP');
        }
    };

    // resend otp
    const handleResendOtp = () => {
        toast.promise(forgotPassword({ email: Cookies.get('resetEmail') || '' }).unwrap(), {
            loading: 'Resending OTP...',
            success: (res) => {
                return <b>{res.message}</b>;
            },
            error: (res) => `Error: ${res.data?.message || 'Something went wrong'}`,
        });
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        // lineHeight: 3,
                        controlHeight: 50,

                        borderRadius: 10,
                    },
                },
                token: {
                    colorPrimary: '#0A0B0D',
                },
            }}
        >
            <div className="flex  items-center justify-center h-screen p-5 " style={{}}>
                <div className="bg-[#1C1C1E] max-w-[630px] w-full rounded-lg drop-shadow-2xl shadow-lg p-10 ">
                    <div className="text-primaryText space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2 text-white">Check your email</h1>
                        <p>We sent a reset link to {email} enter 5 digit code that mentioned in the email</p>
                    </div>

                    <Form
                        name="normal_VerifyOtp"
                        className="my-5"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className="flex items-center justify-center mx-auto"
                            name="otp"
                            rules={[{ required: true, message: 'Please input otp code here!' }]}
                        >
                            <Input.OTP
                                style={{
                                    width: 300,
                                }}
                                className=""
                                variant="filled"
                                length={4}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className="bg-primary "
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
                                Verify Code
                            </Button>
                        </Form.Item>
                        <div
                            onClick={handleResendOtp}
                            className="text-center text-lg flex items-center justify-center gap-2"
                        >
                            <p className="text-primaryText">Didn't receive the code?</p>
                            <p className="text-[#00BCD1] cursor-pointer active:text-[#049eaf]">Resend</p>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
