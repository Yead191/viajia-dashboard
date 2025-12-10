import { Modal, Descriptions, Tag } from 'antd';
import moment from 'moment';
import { SubscriberType } from '../../types/types';

const OrderDetailsModal = ({
    showOrderDetails,
    setShowOrderDetails,
}: {
    showOrderDetails: SubscriberType | null;
    setShowOrderDetails: (val: null) => void;
}) => {
    if (!showOrderDetails) return null;

    const data = showOrderDetails;

    return (
        <Modal
            width={600}
            centered
            open={!!data}
            onCancel={() => setShowOrderDetails(null)}
            footer={null}
            className="custom-black-modal"
            title={null}
        >
            <div className="py-4">
                <h2 className="text-white text-lg mb-4">Subscription Details</h2>
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={data.user.image || 'https://i.ibb.co/z5YHLV9/profile.png'}
                        alt="user"
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#00BCD1]"
                    />
                    <div>
                        <h3 className="text-xl font-semibold text-white">{data.user.name}</h3>
                        <p className="text-[#ABABAB]">{data.user.email}</p>
                    </div>
                </div>

                <Descriptions
                    bordered
                    column={1}
                    size="middle"
                    labelStyle={{ color: '#F1F1F1', fontWeight: 500, width: '150px' }}
                    contentStyle={{ color: '#ABABAB' }}
                    className="mb-4"
                >
                    <Descriptions.Item label="Transaction ID">
                        <span className="font-mono text-xs bg-white/10 px-2 py-1 rounded">{data.txId}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label="Plan Name">
                        <span className="text-[#00BCD1] font-medium">{data.name}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label="Price">${data.price}</Descriptions.Item>

                    <Descriptions.Item label="Plan ID">{data.package}</Descriptions.Item>

                    <Descriptions.Item label="Start Date">
                        {moment(data.startDate).format('MMMM DD, YYYY hh:mm A')}
                    </Descriptions.Item>

                    <Descriptions.Item label="End Date">
                        {moment(data.endDate).format('MMMM DD, YYYY hh:mm A')}
                    </Descriptions.Item>

                    <Descriptions.Item label="Status">
                        <Tag
                            color={
                                data.status === 'active' ? 'success' : data.status === 'cancelled' ? 'error' : 'warning'
                            }
                            className="capitalize"
                        >
                            {data.status}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </Modal>
    );
};

export default OrderDetailsModal;
