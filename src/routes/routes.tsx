import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Dashboard from '../pages/dashboard/dashboard';
import Users from '../pages/dashboard/users';
import TermsAndCondition from '../pages/dashboard/terms-and-condition';
import Profile from '../pages/dashboard/profile';
import Notification from '../pages/dashboard/notification';
import PrivacyPolicy from '../pages/dashboard/privacy-policy';
import AboutUs from '../pages/dashboard/about-us';
import Disclaimer from '../pages/dashboard/disclaimer';
import Transactions from '../pages/dashboard/transactions';
import Bookings from '../pages/dashboard/Bookings';
import FAQ from '../pages/dashboard/faq';
import Subscription from '../pages/dashboard/package';
import SubscriberList from '../pages/dashboard/subscriber-list';
import PrivateRoute from '../provider/PrivateRoutes';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: 'users',
                element: (
                    <PrivateRoute>
                        <Users />
                    </PrivateRoute>
                ),
            },
            {
                path: 'bookings',
                element: (
                    <PrivateRoute>
                        <Bookings />
                    </PrivateRoute>
                ),
            },
            {
                path: 'subscriptions',
                element: (
                    <PrivateRoute>
                        <Subscription />
                    </PrivateRoute>
                ),
            },
            {
                path: 'subscriber-list',
                element: (
                    <PrivateRoute>
                        <SubscriberList />
                    </PrivateRoute>
                ),
            },
            {
                path: 'transactions',
                element: (
                    <PrivateRoute>
                        <Transactions />
                    </PrivateRoute>
                ),
            },
            {
                path: 'profile',
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
            {
                path: 'notification',
                element: (
                    <PrivateRoute>
                        <Notification />
                    </PrivateRoute>
                ),
            },
            {
                path: 'privacy-policy',
                element: (
                    <PrivateRoute>
                        <PrivacyPolicy />
                    </PrivateRoute>
                ),
            },
            {
                path: 'terms-and-condition',
                element: (
                    <PrivateRoute>
                        <TermsAndCondition />
                    </PrivateRoute>
                ),
            },
            {
                path: 'about-us',
                element: (
                    <PrivateRoute>
                        <AboutUs />
                    </PrivateRoute>
                ),
            },
            {
                path: 'disclaimer',
                element: (
                    <PrivateRoute>
                        <Disclaimer />
                    </PrivateRoute>
                ),
            },
            {
                path: 'faq',
                element: (
                    <PrivateRoute>
                        <FAQ />
                    </PrivateRoute>
                ),
            },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;
