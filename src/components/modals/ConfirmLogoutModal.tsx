import { Modal } from 'antd';

type Props = {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmLogoutModal = ({ open, onConfirm, onCancel }: Props) => {
    return (
        <Modal
            open={open}
            onOk={onConfirm}
            onCancel={onCancel}
            okText="Yes, Logout"
            cancelText="Cancel"
            centered
            className="custom-black-modal"
        >
            <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">Confirm Logout</h2>
                <p className="text-gray-500">Are you sure you want to log out?</p>
            </div>
        </Modal>
    );
};

export default ConfirmLogoutModal;
