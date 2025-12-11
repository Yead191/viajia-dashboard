import { FiBell } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useGetProfileQuery } from '../../redux/apiSlices/authSlice';
import { imageUrl } from '../../redux/api/baseApi';

export default function DashboardHeader() {
    // const { user } = useUser();
    const { data: user } = useGetProfileQuery(undefined);
    console.log(user);

    return (
        <div>
            <div className="px-4 bg-[#1C1C1E] h-20 rounded-lg flex items-center justify-end">
                <div className="gap-4">
                    {/* Right section - Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Notifications */}
                        <Link to="/notification">
                            <button className="relative p-2 text-[#223047] hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                <FiBell className="h-6 w-6 text-[#00ABBE]" />
                                <span className="absolute -top-1 -right-0 flex items-center justify-center bg-primary text-white text-xs font-semibold rounded-full w-6 h-6 shadow-md border-2 border-white">
                                    2
                                </span>
                            </button>
                        </Link>
                        {/* Profile */}
                        <Link to="/profile">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={imageUrl + user?.data?.image}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm sm:text-base font-semibold text-[#f1f1f1]">
                                        {user?.data?.name}
                                    </span>
                                    <span className="text-xs sm:text-sm text-[#f1f1f1]/80">{user?.data?.role}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
