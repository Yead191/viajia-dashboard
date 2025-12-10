import { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, CameraOutlined } from '@ant-design/icons';
import { Tabs, Button, Input, message, Avatar, Form, ConfigProvider } from 'antd';
import { useUser } from '../../../provider/User';
import { useUpdateProfileMutation } from '../../../redux/apiSlices/authSlice';
import { toast } from 'sonner';

// JSON input describing form fields for both profile and password change
const profileFormFields = [
    {
        name: 'name',
        label: 'Name',
        placeholder: 'Enter your name',
        rules: [{ required: true, message: 'Please enter your name!' }],
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        rules: [
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
        ],
    },
    {
        name: 'contact',
        label: 'Contact No',
        placeholder: 'Enter your contact number',
        rules: [
            { required: true, message: 'Please enter your contact number!' },
            { pattern: /^[\d+\-\s()]+$/, message: 'Please enter a valid contact number!' },
        ],
    },
];

const passwordFormFields = [
    {
        name: 'current',
        label: 'Current Password',
        placeholder: 'Enter current password',
        rules: [{ required: true, message: 'Please enter your current password!' }],
        type: 'password',
    },
    {
        name: 'new',
        label: 'New Password',
        placeholder: 'Enter new password',
        rules: [{ required: true, message: 'Please enter your new password!' }],
        type: 'password',
    },
    {
        name: 'confirm',
        label: 'Confirm New Password',
        placeholder: 'Confirm new password',
        dependencies: ['new'],
        type: 'password',
        rules: [
            { required: true, message: 'Please confirm your new password!' },
            // Custom validator for passwords match
            ({ getFieldValue }: any) => ({
                validator(_: any, value: string) {
                    if (!value || getFieldValue('new') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                },
            }),
        ],
    },
];

export default function Profile() {
    const [activeTab, setActiveTab] = useState('1');
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const { user } = useUser();
    const [updateProfile] = useUpdateProfileMutation();
    const initialPasswordValues = { current: '', new: '', confirm: '' };

    // Form Handlers
    const handleProfileSubmit = (values: any) => {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value as string);
            }
        });

        toast.promise(updateProfile(formData), {
            loading: 'Updating profile...',
            success: (res) => <b>{res.data.message}</b>,
            error: (err) => <b>{err.data.message}</b>,
        });
    };

    const handlePasswordSubmit = (values: typeof initialPasswordValues) => {
        if (values.new !== values.confirm) {
            message.error('New passwords do not match!');
            return;
        }
        message.success('Password changed successfully!');
    };

    // Toggle password field visibility
    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    // Helper to render fields from JSON
    const renderFields = (
        fields: typeof profileFormFields | typeof passwordFormFields,
        isPassword?: boolean,
        values?: any,
    ) =>
        fields.map((field: any) => {
            console.log(values);
            if (isPassword) {
                // For password fields, show/hide based on toggle
                return (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        label={<label className="block text-sm font-medium text-[#f1f1f1] mb-2">{field.label}</label>}
                        dependencies={field.dependencies}
                        rules={field.rules}
                        className="custom-black-modal"
                    >
                        <div className="relative">
                            <Input
                                size="large"
                                type={showPasswords[field.name as keyof typeof showPasswords] ? 'text' : 'password'}
                                placeholder={field.placeholder}
                                className="rounded-lg pr-10"
                                autoComplete="off"
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer text-[#f1f1f1] hover:text-[#f1f1f1]"
                                onClick={() => togglePasswordVisibility(field.name as 'current' | 'new' | 'confirm')}
                            >
                                {showPasswords[field.name as keyof typeof showPasswords] ? (
                                    <EyeOutlined className="text-lg" />
                                ) : (
                                    <EyeInvisibleOutlined className="text-lg" />
                                )}
                            </span>
                        </div>
                    </Form.Item>
                );
            }
            // For profile fields
            return (
                <Form.Item
                    key={field.name}
                    name={field.name}
                    label={<label className="block text-sm font-medium text-[#f1f1f1] mb-2">{field.label}</label>}
                    rules={field.rules}
                >
                    <Input
                        size="large"
                        placeholder={field.placeholder}
                        className="rounded-lg"
                        autoComplete={field.name === 'email' ? 'email' : undefined}
                    />
                </Form.Item>
            );
        });

    // Tab configuration
    const tabItems = [
        {
            key: '1',
            label: 'Profile Info',
            children: (
                <div className="space-y-6">
                    <div className="flex flex-col items-center ">
                        <div className="relative">
                            <Avatar size={120} src={user?.image} className="border-4 border-teal-50" />
                            <div className="absolute bottom-0 right-0 bg-primary rounded-full p-2 cursor-pointer hover:bg-primary transition">
                                <CameraOutlined className="text-white text-lg" />
                            </div>
                        </div>
                    </div>
                    <Form
                        name="profileForm"
                        layout="vertical"
                        initialValues={user}
                        onFinish={handleProfileSubmit}
                        requiredMark={false}
                        className="custom-black-modal"
                    >
                        {renderFields(profileFormFields)}
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                className="bg-primary hover:bg-primary rounded-lg h-12 text-base text-white w-full"
                            >
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Change Password',
            children: (
                <div className="space-y-6">
                    <Form
                        name="passwordForm"
                        layout="vertical"
                        initialValues={initialPasswordValues}
                        onFinish={handlePasswordSubmit}
                        requiredMark={false}
                    >
                        {renderFields(passwordFormFields, true)}
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                className="bg-primary hover:bg-primary rounded-lg h-12 text-base text-white w-full"
                            >
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
    ];

    return (
        <div className=" py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-[#1C1C1E] rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <ConfigProvider theme={{ token: { colorPrimary: '#00BCD1' } }}>
                            <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" />
                        </ConfigProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}
