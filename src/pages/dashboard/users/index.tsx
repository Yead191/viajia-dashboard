import { Button, ConfigProvider, Input, Table, Pagination } from 'antd';
import { useState } from 'react';
import UserModal from './UserModal';
import BlockModal from './BlockModal';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CiCircleInfo, CiLock, CiUnlock } from 'react-icons/ci';
import { Search } from 'lucide-react';
import { useChangeStatusUserMutation, useGetUsersQuery } from '../../../redux/apiSlices/userSlice';
import moment from 'moment';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function Users({ dashboard }: { dashboard?: boolean }) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isBlockModalVisible, setIsBlockModalVisible] = useState<boolean>(false);
    const [userToBlock, setUserToBlock] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    // console.log(userToBlock);
    const {
        data: usersData,
        isLoading,
        refetch,
    } = useGetUsersQuery({
        searchTerm: searchTerm,
        page: page,
        limit: 10,
    });

    const [changeStatusUser] = useChangeStatusUserMutation();

    const users = usersData?.data?.result || usersData?.data || [];
    const meta = usersData?.data?.meta;

    const showUserDetails = (user: any) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const showBlockModal = (user: any) => {
        setUserToBlock(user);
        setIsBlockModalVisible(true);
    };

    const handleBlockConfirm = () => {
        // Handle block user logic here
        // console.log('Blocking user:', userToBlock);
        toast.promise(
            changeStatusUser({
                id: userToBlock._id,
                status: userToBlock.status === 'active' ? 'delete' : 'active',
            }).unwrap(),
            {
                loading: 'Loading...',
                success: (res) => {
                    setIsBlockModalVisible(false);
                    setUserToBlock(null);
                    refetch();
                    return <b>{res.message}</b>;
                },
                error: (err) => {
                    return <b>{err.data.message}</b>;
                },
            },
        );
    };

    const handleBlockCancel = () => {
        setIsBlockModalVisible(false);
        setUserToBlock(null);
    };

    const columns = [
        {
            title: 'User ID',
            dataIndex: '_id',
            key: '_id',
            responsive: ['sm'] as any,
            render: (text: string) => <span title={text}>#{text.slice(-6)}</span>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'] as any,
        },
        {
            title: 'Registration Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            responsive: ['sm'] as any,
            render: (date: string) => moment(date).format('YYYY-MM-DD'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <span className={status === 'active' ? 'text-green-500 capitalize' : 'text-red-500 capitalize'}>
                    {status}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<CiCircleInfo size={24} />}
                        className="text-gray-500 hover:text-primary"
                        onClick={() => showUserDetails(record)}
                    />

                    <Button
                        type="text"
                        icon={record?.status === 'active' ? <CiUnlock size={24} /> : <CiLock size={24} />}
                        className={
                            record?.status === 'active'
                                ? 'text-gray-500 hover:!text-red-500'
                                : 'hover:!text-gray-500 !text-red-500'
                        }
                        onClick={() => showBlockModal(record)}
                    />
                    {/* <Button
                        type="text"
                        icon={<MdOutlineDeleteOutline size={24} />}
                        className={'text-red-400 hover:!text-red-500'}
                        onClick={() => showBlockModal(record)}
                    /> */}
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="rounded-lg shadow-sm bg-[#1C1C1E] pt-4 px-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <HeaderTitle title={dashboard ? 'All Users' : 'Users List'} className="" />
                    {dashboard ? (
                        <Link className="text-white" to="/dashboard/users">
                            View All
                        </Link>
                    ) : (
                        <Input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search"
                            className="bg-[#0A0B0D] rounded-lg border-0"
                            style={{ width: 280, height: 40 }}
                            prefix={<Search className="text-[#ABABAB]" />}
                        />
                    )}
                </div>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#00BCD1',
                        },
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={users}
                        rowKey="_id"
                        loading={isLoading}
                        pagination={false}
                        className="custom-table"
                    />
                    {!dashboard && meta && (
                        <div className="flex justify-end mt-4">
                            <Pagination
                                current={page}
                                total={meta.total}
                                pageSize={meta.limit}
                                onChange={(p) => setPage(p)}
                                showSizeChanger={false}
                            />
                        </div>
                    )}
                </ConfigProvider>
            </div>

            <UserModal
                isModalVisible={isModalVisible}
                handleModalClose={handleModalClose}
                selectedUser={selectedUser}
            />

            <BlockModal
                isBlockModalVisible={isBlockModalVisible}
                handleBlockCancel={handleBlockCancel}
                handleBlockConfirm={handleBlockConfirm}
                isUserBlocked={userToBlock?.status !== 'active'}
            />
        </>
    );
}
