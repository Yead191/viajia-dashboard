import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import AddInputForm from './AddInputForm';
import EditInputForm from './EditInputForm';
import { useDeletePackageMutation, useGetPackagesQuery } from '../../../redux/apiSlices/packageSlice';
import { toast } from 'sonner';

export interface SubscriptionType {
    _id?: string;
    name: string;
    price: number;
    features: string[];
    // New fields from API
    status: string;
    paymentId: string;
    referenceId: string;
    recurring: string;
    createdAt?: string;
    updatedAt?: string;
    perfect_for: string;
    __v?: number;
}

const Subscription = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editPackage, setEditPackage] = useState<SubscriptionType | null>(null);

    // redux api calls
    const { data: packages, refetch } = useGetPackagesQuery({});
    // console.log(packages);

    const [deletePackage] = useDeletePackageMutation();

    // Handle Delete
    const handleDelete = () => {
        if (!deleteId) return;
        toast.promise(deletePackage({ id: deleteId }).unwrap(), {
            loading: 'Deleting package...',
            success: (res) => {
                refetch();
                setShowDelete(false);
                return <b>{res.message || 'Package deleted successfully'}</b>;
            },
            error: (err) => {
                return <b>{err.data?.message || 'Failed to delete package'}</b>;
            },
        });
    };

    return (
        <div className=" pt-4 px-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-medium text-white">Subscription Plans</h2>

                <Button
                    onClick={() => setOpenAddModal(true)}
                    style={{
                        width: 200,
                        height: 40,
                        backgroundColor: '#00BCD1',
                        border: 'none',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                    }}
                >
                    <PlusOutlined />
                    Create Subscription
                </Button>
            </div>

            {/* Subscription Cards */}
            <div className="flex flex-wrap justify-start gap-10 mt-10">
                {packages?.data?.map((pkg: any) => (
                    <div
                        key={pkg._id}
                        className="max-w-[320px] w-full min-h-[420px] bg-[#1C1C1E] py-4 px-6 rounded-lg flex flex-col"
                    >
                        {/* Delete Button */}
                        <div className="flex justify-end py-2">
                            <div
                                className="cursor-pointer bg-[#00BCD1] p-2 rounded-full"
                                onClick={() => {
                                    setDeleteId(pkg._id);
                                    setShowDelete(true);
                                }}
                            >
                                <MdDeleteOutline className="text-xl text-white" />
                            </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-xl font-medium text-center pb-2 text-[#F1F1F1]">{pkg.name}</h4>

                        {/* Price */}
                        <h4 className="text-center pb-3 text-[#F1F1F1]">
                            <span className="text-4xl font-semibold  text-[#00BCD1]">${pkg.price}</span> /{' '}
                            {pkg.recurring}
                        </h4>

                        {/* Features */}
                        <div className="space-y-3 flex-grow text-[#ABABAB]">
                            {pkg.features.map((feature: any, idx: number) => (
                                <div className="flex gap-2 items-start" key={idx}>
                                    <IoCheckmarkCircle className="text-[#008594] min-w-[24px] mt-[2px]" />
                                    <p className="text-sm">{feature}</p>
                                </div>
                            ))}
                        </div>

                        {/* Edit Button (always bottom aligned) */}
                        <button
                            onClick={() => {
                                setEditPackage(pkg);
                                setOpenEditModal(true);
                            }}
                            className="mt-5 h-[40px] w-full bg-[#00BCD1] text-white font-medium rounded-md"
                        >
                            Edit Package
                        </button>
                    </div>
                ))}
            </div>

            {/* Add Modal */}
            <Modal
                className="custom-black-modal"
                centered
                open={openAddModal}
                onCancel={() => setOpenAddModal(false)}
                width={600}
                footer={false}
            >
                <AddInputForm refetch={refetch} setOpenAddModel={setOpenAddModal} />
            </Modal>

            {/* Edit Modal */}
            <Modal
                className="custom-black-modal"
                centered
                open={openEditModal}
                onCancel={() => setOpenEditModal(false)}
                width={600}
                footer={false}
            >
                <EditInputForm refetch={refetch} setOpenEditModal={setOpenEditModal} packageData={editPackage} />
            </Modal>

            {/* Delete Modal */}
            <Modal
                className="custom-black-modal"
                centered
                open={showDelete}
                onCancel={() => setShowDelete(false)}
                footer={false}
            >
                <div className="p-6 text-center">
                    <p className="text-red-600 font-semibold text-lg">Are you sure?</p>
                    <p className="py-4 text-white/90">Do you want to delete this package?</p>
                    <button onClick={handleDelete} className="bg-[#00BCD1] text-white px-6 py-2 rounded-md">
                        Confirm
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Subscription;
