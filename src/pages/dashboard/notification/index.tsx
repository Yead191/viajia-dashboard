'use client';

import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';
import { useGetProfileQuery } from '../../../redux/apiSlices/authSlice';
import { imageUrl } from '../../../redux/api/baseApi';
import {
    useGetNotificationQuery,
    useReadAllNotificationMutation,
    useReadOneNotificationMutation,
} from '../../../redux/apiSlices/notificationSlice';

export default function NotificationPage() {
    const [page] = useState(1);
    const limit = 50;
    // const navigate = useNavigate();

    const socket = useMemo(() => io(imageUrl), []);
    const { data: user } = useGetProfileQuery(null);

    const { data: notificationData, refetch } = useGetNotificationQuery({ page, limit });

    const [readAllNotification] = useReadAllNotificationMutation();
    const [readOneNotification] = useReadOneNotificationMutation();

    const notifications = notificationData?.data?.notifications || [];

    // Socket live updates
    useEffect(() => {
        if (!user?.data?._id) return;

        socket.on(`notification::${user?.data?._id}`, () => {
            refetch();
        });

        return () => {
            socket.off(`notification::${user?.data?._id}`);
        };
    }, [user?.data?._id]);

    // Group by timestamp
    const groupedNotifications = notifications.reduce((acc: any, notif: any) => {
        const group = acc.find((g: any) => g.timestamp === notif.timestamp);
        if (group) group.items.push(notif);
        else acc.push({ timestamp: notif.timestamp, items: [notif] });
        return acc;
    }, []);

    const handleReadAll = () => {
        toast.promise(readAllNotification({}).unwrap(), {
            loading: 'Reading all notifications...',
            success: (res) => <b>{res.message}</b>,
            error: 'Failed to mark all as read',
        });
    };

    const hasUnread = notifications.some((n: any) => !n.isRead);

    return (
        <div className="bg-[#1C1C1E]">
            <div className="bg-[#1C1C1E]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-[#F1F1F1]">Notifications</h2>

                    <button
                        onClick={handleReadAll}
                        disabled={!hasUnread}
                        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white"
                        style={{
                            opacity: hasUnread ? 1 : 0.6,
                            cursor: hasUnread ? 'pointer' : 'not-allowed',
                        }}
                    >
                        Mark all as read
                    </button>
                </div>

                {groupedNotifications.map((group: any) => (
                    <div key={group.timestamp}>
                        <div className="px-6 py-3">
                            <p className="text-sm font-medium text-[#F1F1F1]">{group.timestamp}</p>
                        </div>

                        {group.items.map((notif: any) => (
                            <div
                                key={notif._id}
                                onClick={() => {
                                    readOneNotification(notif._id);
                                    refetch();
                                }}
                                className="px-6 py-4 hover:bg-black transition-colors cursor-pointer flex items-start gap-4"
                            >
                                <div
                                    className={`w-2.5 h-2.5 mt-4 rounded-full ${
                                        !notif.isRead ? 'bg-primary' : 'bg-transparent'
                                    }`}
                                />

                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-green-200 flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold">👤</span>
                                </div>

                                <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-[#F1F1F1] font-medium">{notif.message}</p>
                                    <p className="text-sm text-[#F1F1F1] mt-1">{notif.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

                {groupedNotifications.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Bell className="w-12 h-12 text-[#F1F1F1] mb-4" />
                        <p className="text-[#F1F1F1] font-medium">No notifications</p>
                        <p className="text-sm text-[#F1F1F1]">You're all caught up!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
