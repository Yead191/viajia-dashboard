import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input, Select } from 'antd';
import { SubscriptionType } from '.';
import { useCreatePackageMutation } from '../../../redux/apiSlices/packageSlice';
import { toast } from 'sonner';

interface AddInputFormProps {
    setOpenAddModel: (v: boolean) => void;
    refetch: () => void;
}

const AddInputForm: React.FC<AddInputFormProps> = ({ setOpenAddModel, refetch }) => {
    const [form] = Form.useForm();
    const [createPackage] = useCreatePackageMutation();
    const onFinish = (values: any) => {
        const newData: SubscriptionType = {
            // _id: Date.now().toString(),
            name: values.name,
            recurring: values.recurring,
            price: Number(values.price),
            perfect_for: values.perfect_for,
            features: values.features,
            status: values.status,
            paymentId: values.paymentId,
            referenceId: values.referenceId,
        };
        toast.promise(createPackage(newData).unwrap(), {
            loading: 'Creating Package',
            success: (res) => {
                form.resetFields();
                refetch();
                setOpenAddModel(false);
                return <b>{res.message}</b>;
            },
            error: (err) => {
                return <b>{err.data.message}</b>;
            },
        });
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00BCD1',
                },
            }}
        >
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item name="name" label="Package Name" rules={[{ required: true }]}>
                    <Input placeholder="Enter package name" />
                </Form.Item>

                <Form.Item
                    name="recurring"
                    label="Recurring Billing"
                    rules={[{ required: true }]}
                    className="custom-black-modal"
                    // style={{ height: '40px' }}
                >
                    <Select
                        placeholder="Select billing cycle"
                        className="custom-black-modal !bg-[#0a0b0d]"
                        style={{ height: '40px', borderRadius: '6px' }}
                    >
                        <Select.Option value="daily">Daily</Select.Option>
                        <Select.Option value="weekly">Weekly</Select.Option>
                        <Select.Option value="monthly">Monthly</Select.Option>
                        <Select.Option value="yearly">Yearly</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <Input type="number" placeholder="Enter price" />
                </Form.Item>

                <Form.Item name="status" label="Status" rules={[{ required: true }]} initialValue="active">
                    <Select
                        placeholder="Select status"
                        className="custom-black-modal !bg-[#0a0b0d]"
                        style={{ height: '40px', borderRadius: '6px' }}
                    >
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="perfect_for" label="Perfect For" rules={[{ required: true }]}>
                    <Input placeholder="Enter perfect for text" />
                </Form.Item>
                <Form.Item name="paymentId" label="Payment ID" rules={[{ required: true }]}>
                    <Input placeholder="Enter payment ID" />
                </Form.Item>

                <Form.Item name="referenceId" label="Reference ID" rules={[{ required: true }]}>
                    <Input placeholder="Enter reference ID" />
                </Form.Item>

                {/* Dynamic Fields */}
                <Form.List name="features">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                <div key={field.key} className="flex items-center gap-3 mb-2">
                                    <Form.Item
                                        {...field}
                                        rules={[{ required: true, message: 'Enter feature' }]}
                                        className="flex-1"
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
                    Submit
                </Button>
            </Form>
        </ConfigProvider>
    );
};

export default AddInputForm;
