import { Button, Descriptions, Modal, Tag } from 'antd';

import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
export default function UserModal({
    isModalVisible,
    handleModalClose,
    selectedUser,
}: {
    isModalVisible: boolean;
    handleModalClose: () => void;
    selectedUser: any;
}) {
    return (
        <Modal
            centered
            title={null}
            open={isModalVisible}
            onCancel={handleModalClose}
            className="custom-black-modal"
            footer={[
                <Button key="close" onClick={handleModalClose}>
                    Close
                </Button>,
            ]}
            width={600}
        >
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">User Details</h2>
                {/* <Button onClick={handleModalClose}>Close</Button> */}
            </div>
            {selectedUser && (
                <div className="py-4 ">
                    <Descriptions bordered column={1} size="middle">
                        <Descriptions.Item
                            label={
                                <span className="font-medium !text-[#F1F1F1]">
                                    <UserOutlined className="mr-2" />
                                    User ID
                                </span>
                            }
                        >
                            <Tag color="blue">{selectedUser.serialId || selectedUser._id || 'N/A'}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item
                            className="!text-[#F1F1F1]"
                            label={
                                <span className="font-medium ">
                                    <UserOutlined className="mr-2" />
                                    Name
                                </span>
                            }
                        >
                            {selectedUser.name || selectedUser.userName}
                        </Descriptions.Item>
                        <Descriptions.Item
                            className="!text-[#F1F1F1]"
                            label={
                                <span className="font-medium ">
                                    <MailOutlined className="mr-2" />
                                    Email
                                </span>
                            }
                        >
                            {selectedUser.email}
                        </Descriptions.Item>
                        <Descriptions.Item
                            className="!text-[#F1F1F1]"
                            label={
                                <span className="font-medium ">
                                    <PhoneOutlined className="mr-2" />
                                    Contact Number
                                </span>
                            }
                        >
                            {selectedUser.contactNumber}
                        </Descriptions.Item>
                        <Descriptions.Item
                            className="!text-[#F1F1F1]"
                            label={
                                <span className="font-medium">
                                    <CalendarOutlined className="mr-2" />
                                    Subscription
                                </span>
                            }
                        >
                            <Tag color={selectedUser.subscription === 'Yearly' ? 'green' : 'orange'}>
                                {selectedUser.subscription}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            )}
        </Modal>
    );
}
