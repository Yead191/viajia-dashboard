import { ConfigProvider, Input, Select, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CiCircleInfo } from 'react-icons/ci';
import { useState } from 'react';
import OrderDetailsModal from '../../../components/modals/OrderDetailsModal';
import { Search } from 'lucide-react';
import { useGetAllSubscribesQuery } from '../../../redux/apiSlices/subscriberSlice';
import { SubscriberType } from '../../../types/types';
import moment from 'moment';

export default function SubscriberList({ dashboard }: { dashboard?: boolean }) {
    const [showOrderDetails, setShowOrderDetails] = useState<SubscriberType | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [page, setPage] = useState<number>(1);

    // api call
    const { data: subscribersData, isLoading } = useGetAllSubscribesQuery({
        type: selectedType,
        status: selectedStatus,
        searchTerm,
        page: page,
    });

    const subscribers: SubscriberType[] = subscribersData?.data || [];
    const paginationData = subscribersData?.pagination;

    const columns: ColumnsType<SubscriberType> = [
        {
            title: 'S.ID',
            width: 100,
            dataIndex: 'key',
            key: 'key',
            render: (_: any, record: SubscriberType, index: number) => {
                // Use serial ID or index if key/id not present in short form
                return <span className="text-white">#{index + 1 + (page - 1) * 10}</span>;
            },
        },
        {
            title: 'User Name',
            dataIndex: 'user',
            key: 'user',
            render: (user: SubscriberType['user']) => (
                <div className="flex items-center gap-2">
                    <img
                        src={user?.image || 'https://i.ibb.co/z5YHLV9/profile.png'}
                        alt="user"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-[#F1F1F1]">
                        <p className="font-medium text-[15px]">{user?.name}</p>
                        <p className="text-xs text-[#BABABA]">{user?.email}</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Plan Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="text-white">{text}</span>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span className="text-[#00BCD1]">${text}</span>,
        },
        {
            title: 'Date Range',
            key: 'date',
            render: (_, record) => (
                <div className="text-[#BABABA] text-sm">
                    <p>{moment(record.startDate).format('MMM DD, YYYY')}</p>
                    <p className="text-xs">to {moment(record.endDate).format('MMM DD, YYYY')}</p>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = '#52C41A';
                let bg = '#D9F2CD';

                if (status === 'active') {
                    color = '#52C41A';
                    bg = 'rgba(82, 196, 26, 0.2)';
                } else if (status === 'cancelled') {
                    color = '#FF4D4F';
                    bg = 'rgba(255, 77, 79, 0.2)';
                } else if (status === 'expired') {
                    color = '#FAAD14';
                    bg = 'rgba(250, 173, 20, 0.2)';
                }

                return (
                    <span className="px-3 py-1 rounded-full capitalize" style={{ color: color, backgroundColor: bg }}>
                        {status}
                    </span>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<CiCircleInfo size={24} />}
                        className="text-gray-500 hover:text-blue-500"
                        onClick={() => setShowOrderDetails(record)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="rounded-lg shadow-sm p-4 bg-[#1C1C1E]">
                <div className="flex items-center text-[#F1F1F1] justify-between mb-4">
                    <HeaderTitle title={dashboard ? 'Recent Subscribers' : 'Subscriber List'} />
                    <div className="flex items-center gap-3 mb-4">
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#00BCD1',
                                },
                            }}
                        >
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by Name or email"
                                className="bg-[#0A0B0D] rounded-lg border-0"
                                style={{ width: 280, height: 40 }}
                                prefix={<Search className="text-[#ABABAB]" />}
                            />

                            <Select
                                placeholder="Type"
                                className="custom-black-modal !bg-[#0a0b0d]"
                                style={{ height: '40px', borderRadius: '6px', width: 120 }}
                                allowClear
                                onChange={(value) => setSelectedType(value)}
                                value={selectedType}
                            >
                                <Select.Option value="">All Plans</Select.Option>
                                <Select.Option value="explorer">Explorer</Select.Option>
                                <Select.Option value="premium">Premium</Select.Option>
                                <Select.Option value="premium-plus">Premium Plus</Select.Option>
                                <Select.Option value="pro">Pro</Select.Option>
                            </Select>

                            <Select
                                placeholder="Status"
                                className="custom-black-modal !bg-[#0a0b0d]"
                                style={{ height: '40px', borderRadius: '6px', width: 120 }}
                                allowClear
                                onChange={(value) => setSelectedStatus(value)}
                                value={selectedStatus}
                            >
                                <Select.Option value="">All Status</Select.Option>
                                <Select.Option value="active">Active</Select.Option>
                                <Select.Option value="cancelled">Cancelled</Select.Option>
                                <Select.Option value="expired">Expired</Select.Option>
                            </Select>
                        </ConfigProvider>
                    </div>
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                colorText: '#ffffff',
                                colorBgContainer: '#1C1C1E',
                                headerBg: '#1C1C1E',
                                headerColor: '#ffffff',
                                borderColor: '#333333',
                                rowHoverBg: '#2C2C2E',
                            },
                        },
                    }}
                >
                    <Table
                        loading={isLoading}
                        columns={columns}
                        dataSource={subscribers}
                        pagination={{
                            total: paginationData?.total,
                            pageSize: paginationData?.limit,
                            current: paginationData?.page,
                            onChange: (page) => setPage(page),
                        }}
                        className="custom-table"
                        rowKey="_id"
                    />
                </ConfigProvider>
            </div>

            <OrderDetailsModal showOrderDetails={showOrderDetails} setShowOrderDetails={setShowOrderDetails} />
        </div>
    );
}
