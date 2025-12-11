import { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, CameraOutlined } from '@ant-design/icons';
import { Tabs, Button, Input, message, Avatar, Form, ConfigProvider, Upload } from 'antd';
import { toast } from 'sonner';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../redux/apiSlices/authSlice';
import { imageUrl } from '../../../redux/api/baseApi';

const passwordFormFields = [
    {
        name: 'current',
        label: 'Current Password',
        placeholder: 'Enter current password',
        type: 'password',
        rules: [{ required: true, message: 'Please enter your current password!' }],
    },
    {
        name: 'new',
        label: 'New Password',
        placeholder: 'Enter new password',
        type: 'password',
        rules: [{ required: true, message: 'Please enter your new password!' }],
    },
    {
        name: 'confirm',
        label: 'Confirm New Password',
        placeholder: 'Confirm new password',
        dependencies: ['new'],
        type: 'password',
        rules: [
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }: any) => ({
                validator(_: any, value: string) {
                    return !value || value === getFieldValue('new')
                        ? Promise.resolve()
                        : Promise.reject('Passwords do not match!');
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

    const [imageFile, setImageFile] = useState<File | null>(null);

    const { data: user, refetch } = useGetProfileQuery(undefined);
    const [updateProfile] = useUpdateProfileMutation();

    /* -------------------------------
                PROFILE SUBMIT
       ------------------------------- */
    const handleProfileSubmit = (values: any) => {
        const formData = new FormData();
        formData.append('name', values.name);

        if (imageFile) {
            formData.append('image', imageFile);
        }

        toast.promise(updateProfile(formData), {
            loading: 'Updating profile...',
            success: (res) => {
                setImageFile(null);
                refetch();
                return <b>{res.data.message}</b>;
            },
            error: (err) => <b>{err.data.message}</b>,
        });
    };

    /* -------------------------------
                PASSWORD SUBMIT
       ------------------------------- */
    const handlePasswordSubmit = (values: any) => {
        if (values.new !== values.confirm) {
            return message.error('New passwords do not match!');
        }
        message.success('Password changed successfully!');
    };

    /* -------------------------------
              PASSWORD VISIBILITY
       ------------------------------- */
    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    /* -------------------------------
            RENDER PASSWORD FIELDS
       ------------------------------- */
    const renderPasswordFields = () =>
        passwordFormFields?.map((field) => (
            <Form.Item
                key={field.name}
                name={field.name}
                label={<label className="text-sm text-[#f1f1f1]">{field.label}</label>}
                rules={field.rules}
                dependencies={field.dependencies}
                className=""
            >
                <div className="relative">
                    <Input
                        size="large"
                        type={showPasswords[field.name as keyof typeof showPasswords] ? 'text' : 'password'}
                        placeholder={field.placeholder}
                        className="rounded-lg pr-10 flex items-center !h-10"
                        autoComplete="off"
                    />
                    <span
                        className="absolute right-3 top-2.5 text-[#f1f1f1] cursor-pointer"
                        onClick={() => togglePasswordVisibility(field.name as keyof typeof showPasswords)}
                    >
                        {showPasswords[field.name as keyof typeof showPasswords] ? (
                            <EyeOutlined />
                        ) : (
                            <EyeInvisibleOutlined />
                        )}
                    </span>
                </div>
            </Form.Item>
        ));

    /* -------------------------------
                    TABS
       ------------------------------- */
    const tabItems = [
        {
            key: '1',
            label: 'Profile Info',
            children: (
                <div className="space-y-6">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <Avatar
                                size={120}
                                src={imageFile ? URL.createObjectURL(imageFile) : imageUrl + user?.data?.image}
                                className="border-4 border-teal-50"
                            />
                            <Upload
                                showUploadList={false}
                                beforeUpload={(file) => {
                                    setImageFile(file);
                                    return false;
                                }}
                            >
                                <div className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer">
                                    <CameraOutlined className="text-white" />
                                </div>
                            </Upload>
                        </div>
                    </div>

                    <Form
                        name="profileForm"
                        layout="vertical"
                        initialValues={{ name: user?.data?.name }}
                        onFinish={handleProfileSubmit}
                        requiredMark={false}
                        className="custom-black-modal"
                    >
                        <Form.Item
                            name="name"
                            label={<label className="text-sm text-[#f1f1f1]">Name</label>}
                            rules={[{ required: true, message: 'Please enter your name!' }]}
                        >
                            <Input size="large" placeholder="Enter your name" className="rounded-lg" />
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType="submit" className="bg-primary text-white h-12 w-full rounded-lg">
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
                <Form
                    name="passwordForm"
                    layout="vertical"
                    onFinish={handlePasswordSubmit}
                    requiredMark={false}
                    className="custom-black-modal"
                >
                    {renderPasswordFields()}
                    <Form.Item>
                        <Button htmlType="submit" className="bg-primary text-white h-12 w-full rounded-lg">
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
    ];

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-[#1C1C1E] rounded-xl shadow-lg p-6 sm:p-8">
                    <ConfigProvider theme={{ token: { colorPrimary: '#00BCD1' } }}>
                        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" />
                    </ConfigProvider>
                </div>
            </div>
        </div>
    );
}
