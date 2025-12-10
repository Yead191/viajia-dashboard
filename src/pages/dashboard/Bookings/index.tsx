import { Button, Card, ConfigProvider, Descriptions, Input, Modal, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { StatCard } from '../dashboard';
import { BookingType } from '../../../types/types';
import { AiOutlineEye } from 'react-icons/ai';
import { Search } from 'lucide-react';
import { useGetBookingsQuery } from '../../../redux/apiSlices/bookingSlice';
import moment from 'moment';
import { FaCar } from 'react-icons/fa';
import { MdFlight, MdHotel } from 'react-icons/md';

const Bookings: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [type, setType] = useState('flight');
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(null);

    const { data: bookingsData, isLoading } = useGetBookingsQuery({ type: type, searchTerm });

    // Stats from API summary
    const stats = bookingsData?.data?.summury || {
        totalFlightBookings: 0,
        totalHotelBookings: 0,
        totalCarrentalBookings: 0,
    };

    const bookings: BookingType[] = bookingsData?.data?.bookings || [];
    const meta = bookingsData?.pagination || {};

    // ---------------- Columns -----------------------
    const columns: ColumnsType<BookingType> = [
        {
            title: 'Booking ID',
            dataIndex: 'bookingId',
            key: 'bookingId',
            render: (text) => <span className="font-medium text-white">{text}</span>,
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (user) => (
                <div className="flex items-center gap-2">
                    <img
                        src={user?.image || 'https://i.ibb.co/z5YHLV9/profile.png'}
                        alt="user"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-white font-medium text-sm">{user?.name}</p>
                        <p className="text-[#ABABAB] text-xs">{user?.email}</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Service',
            key: 'service',
            render: (_, record) => (
                <div>
                    {record.type === 'hotel' ? (
                        <p className="text-white text-sm">{record.hotelName}</p>
                    ) : record.type === 'flight' ? (
                        <p className="text-white text-sm">{record.airlineName || 'Flight Booking'}</p>
                    ) : (
                        <p className="text-white text-sm">Car Rental</p>
                    )}
                </div>
            ),
        },
        {
            title: 'Check In/Out',
            key: 'dates',
            render: (_, record) => (
                <div className="text-sm text-[#ABABAB]">
                    <p>In: {moment(record.checkIn).format('MMM DD, YYYY')}</p>
                    <p>Out: {moment(record.checkOut).format('MMM DD, YYYY')}</p>
                </div>
            ),
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price) => <span className="font-medium text-[#00BCD1]">${price}</span>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => {
                let color = 'blue';
                let icon = null;
                if (type === 'hotel') {
                    color = 'orange';
                    icon = <MdHotel className="inline mr-1" />;
                }
                if (type === 'flight') {
                    color = 'green';
                    icon = <MdFlight className="inline mr-1" />;
                }
                if (type === 'car_rental') {
                    color = 'purple';
                    icon = <FaCar className="inline mr-1" />;
                }

                return (
                    <Tag color={color} className="capitalize">
                        {icon} {type?.replace('_', ' ')}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <div className="flex justify-end gap-2.5 py-1.5">
                    <button
                        onClick={() => {
                            setSelectedBooking(record);
                            setOpenViewModal(true);
                        }}
                    >
                        <AiOutlineEye size={24} className="text-secondary hover:text-[#00BCD1] transition-colors" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="h-full">
            <div style={{ borderRadius: '12px' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-4 text-white/80">
                    <StatCard icon={<MdFlight />} title="Flight Bookings" value={stats.totalFlightBookings} />
                    <StatCard icon={<MdHotel />} title="Hotel Bookings" value={stats.totalHotelBookings} />
                    <StatCard icon={<FaCar />} title="Car Rentals" value={stats.totalCarrentalBookings} />
                </div>
                <Card className="shadow-sm bg-[#1C1C1E] border-0">
                    {/* Header */}
                    <div className="flex items-center justify-between px-2 pt-2">
                        <h3 className="text-lg font-semibold text-white/90">All Bookings</h3>

                        <div className="flex items-center gap-3 mb-4">
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: '#00BCD1',
                                    },
                                }}
                            >
                                <Input
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by ID or Name"
                                    className="bg-[#0A0B0D] rounded-lg border-0"
                                    style={{ width: 280, height: 40 }}
                                    prefix={<Search className="text-[#ABABAB]" />}
                                />
                                <Select
                                    placeholder="Type"
                                    className="custom-black-modal !bg-[#0a0b0d]"
                                    style={{ height: '40px', borderRadius: '6px', width: 120 }}
                                    allowClear
                                    onChange={(value) => setType(value)}
                                    value={type}
                                >
                                    <Select.Option value="hotel">Hotel</Select.Option>
                                    <Select.Option value="flight">Flight</Select.Option>
                                    {/* <Select.Option value="car_rental">Car Rental</Select.Option> */}
                                </Select>
                            </ConfigProvider>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="relative p-2">
                        <Table
                            loading={isLoading}
                            size="large"
                            columns={columns}
                            rowKey="_id"
                            dataSource={bookings}
                            pagination={{
                                current: page,
                                total: meta.total || 0,
                                pageSize: meta.limit || 10,
                                onChange: (p) => setPage(p),
                            }}
                        />
                    </div>
                </Card>
            </div>

            {/* ---------------- View Modal ---------------- */}
            {selectedBooking && (
                <BookingDetailsModal
                    open={openViewModal}
                    onClose={() => setOpenViewModal(false)}
                    booking={selectedBooking}
                />
            )}
        </div>
    );
};

export default Bookings;

// ===================================================
//   Booking Details Modal
// ===================================================
interface BookingDetailsProps {
    open: boolean;
    onClose: () => void;
    booking: BookingType;
}

const BookingDetailsModal: React.FC<BookingDetailsProps> = ({ open, onClose, booking }) => {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            width={600}
            className="custom-black-modal"
            title={null}
        >
            <div className="py-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-white text-lg">Booking Details</h2>
                </div>
                <Descriptions
                    bordered
                    column={1}
                    size="middle"
                    labelStyle={{ color: '#F1F1F1', fontWeight: 500 }}
                    contentStyle={{ color: '#ABABAB' }}
                >
                    <Descriptions.Item label="Booking ID">
                        <Tag color="cyan">{booking.bookingId}</Tag>
                    </Descriptions.Item>

                    <Descriptions.Item label="User">
                        <div className="flex items-center gap-2">
                            <img
                                src={booking.user.image || 'https://i.ibb.co/z5YHLV9/profile.png'}
                                className="w-6 h-6 rounded-full"
                            />
                            <span>
                                {booking.user.name} ({booking.user.email})
                            </span>
                        </div>
                    </Descriptions.Item>

                    <Descriptions.Item label="Booking Type">
                        <span className="capitalize">{booking.type}</span>
                    </Descriptions.Item>

                    {booking.type === 'hotel' && (
                        <>
                            <Descriptions.Item label="Hotel Name">{booking.hotelName}</Descriptions.Item>
                            <Descriptions.Item label="Hotel ID">{booking.hotelId}</Descriptions.Item>
                        </>
                    )}

                    {booking.type === 'flight' && (
                        <Descriptions.Item label="Airline">{booking.airlineName || 'N/A'}</Descriptions.Item>
                    )}

                    <Descriptions.Item label="Check In">
                        {moment(booking.checkIn).format('MMMM DD, YYYY hh:mm A')}
                    </Descriptions.Item>

                    <Descriptions.Item label="Check Out">
                        {moment(booking.checkOut).format('MMMM DD, YYYY hh:mm A')}
                    </Descriptions.Item>

                    <Descriptions.Item label="Total Price">
                        <span className="text-xl font-bold text-[#00BCD1]">${booking.totalPrice}</span>
                    </Descriptions.Item>
                </Descriptions>

                <div className="flex justify-end mt-6">
                    <Button
                        onClick={onClose}
                        className="border-0 bg-[#333] text-white hover:bg-[#444] hover:text-white"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
