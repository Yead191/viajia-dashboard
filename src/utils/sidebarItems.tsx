import { BsPatchQuestion } from 'react-icons/bs';
import { TSidebarItem } from './generateSidebarItems';
import { LuClipboardList, LuLayoutDashboard } from 'react-icons/lu';
import { TbBook } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import { GiKeyring, GiMoneyStack } from 'react-icons/gi';
import { PiUsers } from 'react-icons/pi';
import { LiaCcMastercard } from 'react-icons/lia';

const sidebarItems: TSidebarItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '',
        icon: <LuLayoutDashboard size={24} />,
    },
    {
        key: 'banners',
        label: 'Locker Management',
        path: 'banners',
        icon: <GiKeyring size={24} />,
    },
    // {
    //     key: 'categories',
    //     label: 'Categories',
    //     path: 'categories',
    //     icon: <MdOutlineCategory size={24} />,
    // },
    // {
    //     key: 'chefs',
    //     label: 'Organizers',
    //     path: 'chefs',
    //     icon: <LuUserCog size={24} />,
    // },
    {
        key: 'users',
        label: 'Users',
        path: 'users',
        icon: <PiUsers size={24} />,
    },
    {
        key: 'subscriptions',
        label: 'Subscriptions',
        path: 'subscriptions',
        icon: <LiaCcMastercard size={24} />,
    },
    // {
    //     key: 'drivers',
    //     label: 'Subscribers',
    //     path: 'drivers',
    //     icon: <LuUserCheck size={24} />,
    // },
    {
        key: 'orders',
        label: 'Payments',
        path: 'orders',
        icon: <GiMoneyStack size={24} />,
    },
    {
        key: 'settings',
        label: 'Settings',
        path: 'settings',
        icon: <IoSettingsOutline size={24} />,
        children: [
            {
                key: 'faq',
                label: 'FAQs',
                path: 'faq',
                icon: <FaRegCircleQuestion size={20} />,
            },
            {
                key: 'about-us',
                label: 'About us',
                path: 'about-us',
                icon: <TbBook size={20} />,
            },
            {
                key: 'terms-and-condition',
                label: 'Terms and Condition',
                path: 'terms-and-condition',
                icon: <LuClipboardList size={20} />,
            },
            {
                key: 'privacy-policy',
                label: 'Privacy Policy',
                path: 'privacy-policy',
                icon: <LuClipboardList size={20} />,
            },
            {
                key: 'disclaimer',
                label: 'Disclaimer',
                path: 'disclaimer',
                icon: <BsPatchQuestion size={20} />,
            },
        ],
    },
];

export default sidebarItems;
