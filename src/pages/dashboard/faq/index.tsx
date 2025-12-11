import { useState } from 'react';
import { Button, ConfigProvider, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GoQuestion } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
    useCreateFaqMutation,
    useDeleteFaqMutation,
    useGetFaqQuery,
    useUpdateFaqMutation,
} from '../../../redux/apiSlices/settingSlice';
import { toast } from 'sonner';

interface FaqItem {
    _id: string;
    question: string;
    type: string;
    answer: string;
}

const FAQ = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null);
    const [deleteId, setDeleteId] = useState<string>('');

    // api calls
    const { data: responseData, isLoading } = useGetFaqQuery({ type: activeTab });
    // Assuming API returns array directly or { data: [] }, adjusting based on standard RTK Query patterns often used.
    // However, looking at the slice, it just returns content.
    // If previous code was `faqs.map`, it implies `data` was the array.
    const faqs: FaqItem[] = responseData?.data || responseData || [];

    const [createFaq] = useCreateFaqMutation();
    const [updateFaq] = useUpdateFaqMutation();
    const [deleteFaq] = useDeleteFaqMutation();

    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();

    const tabs = [
        { key: 'overview', label: 'Overview' },
        { key: 'flight', label: 'Flight' },
        { key: 'hotel', label: 'Hotel' },
    ];

    // ADD
    const handleAdd = async () => {
        try {
            const values = await addForm.validateFields();
            const toastId = toast.loading('Creating FAQ...');
            const res = await createFaq({ ...values, type: activeTab }).unwrap();
            if (res) {
                toast.success('FAQ created successfully', { id: toastId });
                setIsAddOpen(false);
                addForm.resetFields();
            }
        } catch (error) {
            toast.error('Failed to create FAQ');
        }
    };

    // EDIT
    const openEdit = (item: FaqItem) => {
        setSelectedFaq(item);
        editForm.setFieldsValue(item);
        setIsEditOpen(true);
    };

    const handleEdit = async () => {
        try {
            const values = await editForm.validateFields();
            if (!selectedFaq) return;
            const toastId = toast.loading('Updating FAQ...');
            const res = await updateFaq({ ...values, id: selectedFaq._id, type: activeTab }).unwrap();
            if (res) {
                toast.success('FAQ updated successfully', { id: toastId });
                setIsEditOpen(false);
                editForm.resetFields();
                setSelectedFaq(null);
            }
        } catch (error) {
            toast.error('Failed to update FAQ');
        }
    };

    // DELETE
    const openDelete = (id: string) => {
        setDeleteId(id);
        setIsDeleteOpen(true);
    };

    const handleDelete = async () => {
        try {
            const toastId = toast.loading('Deleting FAQ...');
            const res = await deleteFaq(deleteId).unwrap();
            if (res) {
                toast.success('FAQ deleted successfully', { id: toastId });
                setIsDeleteOpen(false);
                setDeleteId('');
            }
        } catch (error) {
            toast.error('Failed to delete FAQ');
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00BCD1',
                },
                components: {
                    Modal: {
                        contentBg: '#1f1f1f',
                        headerBg: '#1f1f1f',
                        titleColor: 'white',
                    },
                    Input: {
                        colorBgContainer: '#2a2a2a',
                        colorText: 'white',
                        colorBorder: '#444',
                        colorTextPlaceholder: '#888',
                    },
                },
            }}
        >
            <div className="h-full px-3 py-2 rounded-lg">
                {/* Header & Tabs */}
                <div className="flex flex-col gap-4 px-4 py-3">
                    <div className="flex justify-between items-center">
                        <h3 className="text-[#eee] text-[20px] font-medium">FAQ</h3>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsAddOpen(true)}
                            style={{
                                background: '#00BCD1',
                                border: 'none',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            Add FAQ
                        </Button>
                    </div>

                    {/* Custom Tabs */}
                    <div className="flex items-center gap-8 border-b border-gray-700 mt-2">
                        {tabs.map((tab) => (
                            <div
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`pb-2 cursor-pointer text-base font-medium transition-all duration-300 relative ${
                                    activeTab === tab.key ? 'text-[#00BCD1]' : 'text-[#757575] hover:text-[#00BCD1]'
                                }`}
                            >
                                {tab.label}
                                {activeTab === tab.key && (
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00BCD1]" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* LIST VIEW */}
                <div className="pb-6 px-4 rounded-md mt-4">
                    {isLoading ? (
                        <div className="text-white">Loading...</div>
                    ) : (
                        faqs?.map((item) => (
                            <div
                                key={item._id}
                                className="flex justify-between items-start gap-4 border-b border-[#333] pb-4 mt-4"
                            >
                                {/* Icon */}
                                <div className="mt-3">
                                    <GoQuestion color="#00BCD1" size={25} />
                                </div>

                                {/* Text Section */}
                                <div className="w-full">
                                    <p className="text-base font-medium py-2 px-4 rounded-lg bg-[#1C1C1E] flex items-center gap-8 text-[#ccc]">
                                        {item.question}
                                    </p>

                                    <div className="flex items-start gap-2 py-2 px-4 rounded-lg mt-3">
                                        <p className="text-[#999] leading-[24px]">{item.answer}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2 mt-2">
                                    <CiEdit
                                        size={26}
                                        onClick={() => openEdit(item)}
                                        className="cursor-pointer text-[#FFC107] hover:scale-110 transition-transform"
                                    />
                                    <RiDeleteBin6Line
                                        size={24}
                                        onClick={() => openDelete(item._id)}
                                        className="cursor-pointer text-[#D93D04] hover:scale-110 transition-transform"
                                    />
                                </div>
                            </div>
                        ))
                    )}
                    {!isLoading && faqs?.length === 0 && (
                        <div className="text-center text-[#757575] mt-10">No FAQs found for {activeTab}.</div>
                    )}
                </div>

                {/* ---------------- Add Modal ---------------- */}
                <Modal
                    centered
                    open={isAddOpen}
                    onCancel={() => {
                        setIsAddOpen(false);
                        addForm.resetFields();
                    }}
                    onOk={handleAdd}
                    okText="Save"
                    width={500}
                    className="faq-modal"
                >
                    <h2 className="text-lg font-semibold mb-4 text-white">
                        Add FAQ ({activeTab.charAt(0).toUpperCase() + activeTab.slice(1)})
                    </h2>

                    <Form form={addForm} layout="vertical">
                        <Form.Item
                            name="question"
                            label={<span className="text-white">Question</span>}
                            rules={[{ required: true, message: 'Please enter question' }]}
                        >
                            <Input placeholder="Enter question" className="bg-[#1f1f1f] text-white border-gray-600" />
                        </Form.Item>

                        <Form.Item
                            name="answer"
                            label={<span className="text-white">Answer</span>}
                            rules={[{ required: true, message: 'Please enter answer' }]}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="Enter answer"
                                className="bg-[#1f1f1f] text-white border-gray-600"
                            />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* ---------------- Edit Modal ---------------- */}
                <Modal
                    centered
                    open={isEditOpen}
                    onCancel={() => {
                        setIsEditOpen(false);
                        editForm.resetFields();
                        setSelectedFaq(null);
                    }}
                    onOk={handleEdit}
                    okText="Update"
                    width={500}
                    className="faq-modal"
                >
                    <h2 className="text-lg font-semibold mb-4 text-white">Update FAQ</h2>

                    <Form form={editForm} layout="vertical">
                        <Form.Item
                            name="question"
                            label={<span className="text-white">Question</span>}
                            rules={[{ required: true }]}
                        >
                            <Input className="bg-[#1f1f1f] text-white border-gray-600" />
                        </Form.Item>

                        <Form.Item
                            name="answer"
                            label={<span className="text-white">Answer</span>}
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea rows={4} className="bg-[#1f1f1f] text-white border-gray-600" />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* ---------------- Delete Modal ---------------- */}
                <Modal
                    centered
                    open={isDeleteOpen}
                    onCancel={() => setIsDeleteOpen(false)}
                    onOk={handleDelete}
                    okText="Delete"
                    okButtonProps={{ danger: true }}
                    width={380}
                >
                    <div className="text-center py-6">
                        <p className="text-[#D93D04] font-semibold text-lg">Are you sure?</p>
                        <p className="mt-3 text-gray-700">Do you want to delete this FAQ?</p>
                    </div>
                </Modal>
            </div>
        </ConfigProvider>
    );
};

export default FAQ;
