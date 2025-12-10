import { useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input, Select } from 'antd';
import { SubscriptionType } from '.';
import { useEditPackageMutation } from '../../../redux/apiSlices/packageSlice';
import { toast } from 'sonner';

interface EditProps {
    packageData: SubscriptionType | null;
    setOpenEditModal: (v: boolean) => void;
    refetch: () => void;
}

const EditInputForm: React.FC<EditProps> = ({ packageData, setOpenEditModal, refetch }) => {
    const [form] = Form.useForm();
    const [editPackage] = useEditPackageMutation();
    useEffect(() => {
        if (packageData) {
            form.setFieldsValue(packageData);
        }
    }, [packageData]);

    const onFinish = (values: any) => {
        if (!packageData) return;

        const updated: SubscriptionType = {
            ...packageData,
            name: values.name,
            recurring: values.recurring,
            price: Number(values.price),
            features: values.features,
            status: values.status,
            paymentId: values.paymentId,
            referenceId: values.referenceId,
        };
        toast.promise(editPackage({ id: packageData._id, data: updated }).unwrap(), {
            loading: 'Updating package...',
            success: (res) => {
                refetch();
                setOpenEditModal(false);
                return <b>{res.message || 'Package updated successfully'}</b>;
            },
            error: (err) => {
                return <b>{err.data.message || 'Failed to update package'}</b>;
            },
        });
    };

    return (
        <ConfigProvider
            theme={{
                token: { colorPrimary: '#00BCD1' },
            }}
        >
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item name="name" label="Package Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="recurring" label="Recurring Billing" rules={[{ required: true }]}>
                    <Select placeholder="Select billing cycle">
                        <Select.Option value="daily">Daily</Select.Option>
                        <Select.Option value="weekly">Weekly</Select.Option>
                        <Select.Option value="monthly">Monthly</Select.Option>
                        <Select.Option value="yearly">Yearly</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>

                <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                    <Select placeholder="Select status">
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="paymentId" label="Payment ID" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="referenceId" label="Reference ID" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                {/* Dynamic Feature Fields */}
                <Form.List name="features">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                <div key={field.key} className="flex items-center gap-3 mb-2">
                                    <Form.Item
                                        {...field}
                                        className="flex-1"
                                        rules={[{ required: true, message: 'Enter feature' }]}
                                    >
                                        <Input placeholder="Feature" />
                                    </Form.Item>

                                    <MinusCircleOutlined className="text-red-600" onClick={() => remove(field.name)} />
                                </div>
                            ))}

                            <Button
                                type="dashed"
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                                style={{ width: '100%' }}
                            >
                                Add Feature
                            </Button>
                        </>
                    )}
                </Form.List>

                <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full mt-5 h-11"
                    style={{ backgroundColor: '#00BCD1' }}
                >
                    Update
                </Button>
            </Form>
        </ConfigProvider>
    );
};

export default EditInputForm;
