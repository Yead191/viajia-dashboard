import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

const MainLayout: React.FC = () => {
    return (
        <div className={`grid grid-cols-12 gap-5 p-5`}>
            {/* side bar */}
            <div className="col-span-2 overflow-x-hidden">
                <Sidebar />
            </div>

            {/* main container with header */}
            <div className="col-span-10 ">
                <div>
                    <DashboardHeader />
                </div>
                <div className="h-[calc(100vh-120px)] overflow-y-auto">
                    <div className="h-full overflow-y-auto rounded-md pt-4 pr-2">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
