'use client';

import { ConfigProvider, Modal } from 'antd';

interface DeleteCategoryModalProps {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteModal = ({ open, onCancel, onConfirm }: DeleteCategoryModalProps) => {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#C9961B' } }}>
            <Modal
                title="Confirm Delete"
                centered
                open={open}
                onOk={onConfirm}
                onCancel={onCancel}
                okText="Delete"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this item?</p>
            </Modal>
        </ConfigProvider>
    );
};

export default DeleteModal;
