import { useState } from 'react';
import TotalEarning from './TotalEarning';
import TotalUserChart from './TotalUserChart';
import { GiMoneyStack } from 'react-icons/gi';
import { BsHouseLock } from 'react-icons/bs';
import { PiUsersThree } from 'react-icons/pi';
import Users from '../users';
import { useGetAnalyticsQuery } from '../../../redux/apiSlices/anlatycsSlice';

export const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => (
    <div className="rounded-lg shadow-sm bg-bg p-2 2xl:p-4">
        <div className="flex items-center justify-between gap-2">
            <div>
                <p className="text-[#ABABAB]">{title}</p>
                <p className="text-xl font-semibold text-[#F1F1F1] pt-1">{value}</p>
            </div>
            <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center text-3xl ${
                    title === 'Total Users' && 'bg-[#095CC71A] text-[#095CC7]'
                } ${title === 'Total Bookings' && 'bg-[#00A63E1A] text-[#00A63E]'} ${
                    title === 'Revenue (USD)' && 'bg-[#9810FA1A] text-[#9810FA]'
                }`}
            >
                {icon}
            </div>
        </div>
    </div>
);

const App: React.FC = () => {
    const [revenueYear, setRevenueYear] = useState('2025');
    const [bookingYear, setBookingYear] = useState('2025');

    const { data: analyticsData } = useGetAnalyticsQuery({
        revinueYear: Number(revenueYear),
        bookingYear: Number(bookingYear),
    });

    const summary = analyticsData?.data?.summury;
    const revenueData = analyticsData?.data?.subscriptionMonthWise || [];
    const bookingsData = analyticsData?.data?.totalBookingsMonthWise || [];

    return (
        <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-4">
                <StatCard icon={<PiUsersThree />} title="Total Users" value={summary?.totalUsers || 0} />
                <StatCard icon={<BsHouseLock />} title="Total Bookings" value={summary?.totalBookings || 0} />
                <StatCard icon={<GiMoneyStack />} title="Revenue (USD)" value={summary?.totalRevinue || 0} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Revenue Chart */}
                <TotalEarning data={revenueData} year={revenueYear} setYear={setRevenueYear} />

                {/* Bookings Chart (formerly TotalUserChart) */}
                <TotalUserChart data={bookingsData} year={bookingYear} setYear={setBookingYear} />
            </div>
            <div className="">
                <Users dashboard={true} />
            </div>
        </div>
    );
};

export default App;
