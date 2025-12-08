import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, ConfigProvider, Input, Modal, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { StatCard } from '../dashboard';
import { BsHouseLock } from 'react-icons/bs';
import { GiKeyring, GiMoneyStack } from 'react-icons/gi';
import { PiUsersThree } from 'react-icons/pi';
import { LockerType } from '../../../types/types';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';

// ---------------- Dummy Data -------------------
const lockerData: LockerType[] = [
    {
        lockerID: 'LK-001',
        name: 'Main Entrance Locker',
        lockerLocation: 'Toronto, ON',
        capacity: 40,
        lastActivity: '2025-12-06 14:23',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-002',
        name: 'West Wing Locker',
        lockerLocation: 'Vancouver, BC',
        capacity: 32,
        lastActivity: '2025-12-05 09:15',
        deliveryStatus: 'maintenance',
    },
    {
        lockerID: 'LK-003',
        name: 'Gym Area Locker',
        lockerLocation: 'Calgary, AB',
        capacity: 28,
        lastActivity: '2025-12-07 08:42',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-004',
        name: 'Basement Locker',
        lockerLocation: 'Ottawa, ON',
        capacity: 50,
        lastActivity: '2025-12-06 12:10',
        deliveryStatus: 'offline',
    },
    {
        lockerID: 'LK-005',
        name: 'Parking Lot Locker',
        lockerLocation: 'Winnipeg, MB',
        capacity: 36,
        lastActivity: '2025-12-04 17:22',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-006',
        name: 'Reception Locker',
        lockerLocation: 'Montreal, QC',
        capacity: 22,
        lastActivity: '2025-12-07 09:30',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-007',
        name: 'Warehouse Locker A',
        lockerLocation: 'Edmonton, AB',
        capacity: 60,
        lastActivity: '2025-12-06 16:50',
        deliveryStatus: 'maintenance',
    },
    {
        lockerID: 'LK-008',
        name: 'Warehouse Locker B',
        lockerLocation: 'Edmonton, AB',
        capacity: 55,
        lastActivity: '2025-12-06 11:02',
        deliveryStatus: 'offline',
    },
    {
        lockerID: 'LK-009',
        name: 'Lobby Locker',
        lockerLocation: 'Halifax, NS',
        capacity: 25,
        lastActivity: '2025-12-06 19:44',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-010',
        name: 'Staff Room Locker',
        lockerLocation: 'Regina, SK',
        capacity: 18,
        lastActivity: '2025-12-05 13:27',
        deliveryStatus: 'maintenance',
    },
    {
        lockerID: 'LK-011',
        name: 'Backyard Locker',
        lockerLocation: 'Victoria, BC',
        capacity: 42,
        lastActivity: '2025-12-07 10:05',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-012',
        name: 'North Wing Locker',
        lockerLocation: 'Quebec City, QC',
        capacity: 35,
        lastActivity: '2025-12-05 20:14',
        deliveryStatus: 'offline',
    },
    {
        lockerID: 'LK-013',
        name: 'Conference Room Locker',
        lockerLocation: 'Toronto, ON',
        capacity: 30,
        lastActivity: '2025-12-06 07:55',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-014',
        name: 'Server Room Locker',
        lockerLocation: 'Vancouver, BC',
        capacity: 12,
        lastActivity: '2025-12-07 03:10',
        deliveryStatus: 'maintenance',
    },
    {
        lockerID: 'LK-015',
        name: 'Cafeteria Locker',
        lockerLocation: 'Calgary, AB',
        capacity: 26,
        lastActivity: '2025-12-04 09:18',
        deliveryStatus: 'offline',
    },
    {
        lockerID: 'LK-016',
        name: 'Training Hall Locker',
        lockerLocation: 'Ottawa, ON',
        capacity: 48,
        lastActivity: '2025-12-06 18:01',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-017',
        name: 'Garden Area Locker',
        lockerLocation: 'Winnipeg, MB',
        capacity: 20,
        lastActivity: '2025-12-07 11:25',
        deliveryStatus: 'maintenance',
    },
    {
        lockerID: 'LK-018',
        name: 'Security Room Locker',
        lockerLocation: 'Montreal, QC',
        capacity: 15,
        lastActivity: '2025-12-07 04:40',
        deliveryStatus: 'active',
    },
    {
        lockerID: 'LK-019',
        name: 'Event Hall Locker',
        lockerLocation: 'Edmonton, AB',
        capacity: 52,
        lastActivity: '2025-12-05 15:33',
        deliveryStatus: 'offline',
    },
    {
        lockerID: 'LK-020',
        name: 'South Wing Locker',
        lockerLocation: 'Halifax, NS',
        capacity: 33,
        lastActivity: '2025-12-06 21:12',
        deliveryStatus: 'active',
    },
];

const statusColorMap = {
    maintenance: { color: '#D48806', bg: '#F7F1CC' },
    offline: { color: '#FF4D4F', bg: '#FFD8D7' },
    active: { color: '#52C41A', bg: '#D9F2CD' },
};

const AppSliderList: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [banners, setBanners] = useState<LockerType[]>(lockerData);

    // Modal states
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const [editData, setEditData] = useState<LockerType | null>(null);
    const [deleteId, setDeleteId] = useState<string>('');

    // ---------------- Search -----------------------
    const filteredData = banners.filter((x) => x.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // ---------------- Delete -----------------------
    const handleDelete = () => {
        setBanners((prev) => prev.filter((item) => item._id !== deleteId));
        setOpenDeleteModal(false);
    };

    // ---------------- Add --------------------------
    const handleAddBanner = (name: string) => {
        const newItem: LockerType = {
            _id: (banners.length + 1).toString(),
            lockerID: `LK-${String(banners.length + 1).padStart(3, '0')}`,
            name,
            lockerLocation: '',
            capacity: 0,
            lastActivity: new Date().toLocaleString(),
            deliveryStatus: 'active',
        };
        setBanners([...banners, newItem]);
        setOpenAddModal(false);
    };

    // ---------------- Edit --------------------------
    const handleEditBanner = (name: string) => {
        if (!editData) return;

        setBanners((prev) => prev.map((item) => (item._id === editData._id ? { ...item, name } : item)));
        setOpenEditModal(false);
    };

    // ---------------- Columns -----------------------
    const columns: ColumnsType<LockerType> = [
        {
            title: 'Locker ID',
            dataIndex: 'lockerID',
            key: 'lockerID',
        },
        {
            title: 'Title',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Locker Location',
            dataIndex: 'lockerLocation',
            key: 'lockerLocation',
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            key: 'capacity',
        },
        {
            title: 'Last Activity',
            dataIndex: 'lastActivity',
            key: 'lastActivity',
        },
        {
            title: 'Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            render: (status: LockerType['deliveryStatus'], record: LockerType) => {
                const key = status as keyof typeof statusColorMap;
                const currentStyle =
                    status in statusColorMap
                        ? statusColorMap[key]
                        : {
                              color: '#595959',
                              bg: '#FAFAFA',
                          };

                return (
                    <p
                        className="capitalize px-1 py-0.5 text-center rounded-lg"
                        style={{
                            color: currentStyle.color,
                            backgroundColor: currentStyle.bg,
                        }}
                    >
                        {record?.deliveryStatus}
                    </p>
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
                            setDeleteId(record.lockerID);
                            setOpenDeleteModal(true);
                        }}
                    >
                        <AiOutlineEye size={24} className="text-secondary" />
                    </button>
                    <button
                        onClick={() => {
                            setEditData(record);
                            setOpenEditModal(true);
                        }}
                    >
                        <FaRegEdit size={24} className="text-secondary" />
                    </button>

                    <button
                        onClick={() => {
                            setDeleteId(record.lockerID);
                            setOpenDeleteModal(true);
                        }}
                    >
                        <AiOutlineDelete size={24} className="text-[#FC6057]" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="h-full">
            <div style={{ background: '#FFFFFF', borderRadius: '12px' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-4">
                    <StatCard icon={<BsHouseLock />} title="Total Lockers" value="68" />
                    <StatCard icon={<GiKeyring />} title="Active Keys" value="169" />
                    <StatCard icon={<PiUsersThree />} title="Total Users" value="3,802" />
                    <StatCard icon={<GiMoneyStack />} title="Monthly Revenue" value="AED 45,085" />
                </div>
                <Card className="shadow-sm">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">All Lockers</h3>

                        <div className="flex items-center gap-3 mb-4">
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: '#C9961B',
                                    },
                                }}
                            >
                                <Input
                                    placeholder="Search by name, location"
                                    prefix={<FiSearch size={14} color="#868FA0" />}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ width: 300, height: 40 }}
                                />
                                <Select
                                    placeholder="Status"
                                    style={{ width: 120, height: 40 }}
                                    allowClear
                                    showSearch
                                    onChange={(value) => setSelectedStatus(value)}
                                    filterOption={(input, option) =>
                                        (String(option?.children) ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    <Select.Option value="active">Active</Select.Option>
                                    <Select.Option value="maintenance">Maintenance</Select.Option>
                                    <Select.Option value="offline">Offline</Select.Option>
                                </Select>
                            </ConfigProvider>

                            <button
                                className="bg-primary h-10 px-4 rounded-md text-white text-sm space-x-1"
                                onClick={() => setOpenAddModal(true)}
                            >
                                <PlusOutlined /> Add Locker
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="relative p-2">
                        <Table
                            size="large"
                            columns={columns}
                            rowKey="_id"
                            dataSource={filteredData}
                            pagination={{
                                current: page,
                                total: filteredData.length,
                                pageSize: 7,
                                onChange: (page) => setPage(page),
                            }}
                        />
                    </div>
                </Card>
            </div>

            {/* ---------------- Add Modal ---------------- */}
            <AddOrEditModal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                onSubmit={handleAddBanner}
                title="Add Banner"
                defaultName=""
            />

            {/* ---------------- Edit Modal ---------------- */}
            <AddOrEditModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                onSubmit={handleEditBanner}
                title="Edit Banner"
                defaultName={editData?.name || ''}
            />

            {/* ---------------- Delete Modal ---------------- */}
            <Modal
                centered
                open={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                footer={false}
                width={350}
            >
                <div className="p-6 text-center">
                    <p className="text-red-600 text-lg font-semibold">Are you sure?</p>
                    <p className="mt-2 mb-8">Do you want to delete this banner?</p>

                    <button onClick={handleDelete} className="bg-red-500 text-white px-6 py-2 rounded-md">
                        Yes, Delete
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default AppSliderList;

// ===================================================
//   Add / Edit Modal Component
// ===================================================
interface AddEditProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (name: string) => void;
    title: string;
    defaultName: string;
}

const AddOrEditModal: React.FC<AddEditProps> = ({ open, onClose, onSubmit, title, defaultName }) => {
    const [name, setName] = useState<string>(defaultName);

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#C9961B' } }}>
            <Modal open={open} onCancel={onClose} footer={false} centered width={450}>
                <h2 className="text-lg font-semibold mb-4">{title}</h2>

                <Input
                    placeholder="Banner Title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4 h-10"
                />

                <Button type="primary" onClick={() => onSubmit(name)} className="w-full h-10 mt-4">
                    Submit
                </Button>
            </Modal>
        </ConfigProvider>
    );
};
