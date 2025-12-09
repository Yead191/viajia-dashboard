import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, ConfigProvider, DatePicker } from 'antd';
import { earningsData } from '../../../demo-data/home-data';
import { FaChevronDown } from 'react-icons/fa6';

const CustomLegend = () => {
    return (
        <div className="flex gap-2 2xl:gap-4 text-sm text-[#757575] pr-4">
            <div className="flex items-center gap-1 whitespace-nowrap">
                <div className="w-3 h-3 bg-[#00BCD1] rounded-full" />
                Keys
            </div>
        </div>
    );
};

const TotalEarning = () => {
    const [selectedYear, setSelectedYear] = useState('2025');
    console.log(selectedYear);
    return (
        <div>
            <Card className="rounded-lg shadow-sm bg-bg border-0">
                <div className="flex justify-between items-center mb-4 gap-4">
                    <h2 className="text-lg font-semibold text-[#f1f1f1]">Key Activity</h2>
                    <div className="flex gap-2">
                        <CustomLegend />
                        {/* Year Dropdown */}
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#00BCD1',
                                    colorBgContainer: '#00BCD1',
                                    colorBgElevated: '#00BCD1',
                                    colorBorder: '#00BCD1',
                                    colorText: '#fff',
                                    colorTextPlaceholder: '#fff',
                                    colorIcon: '#fff',
                                },
                            }}
                        >
                            <DatePicker
                                className="!cursor-pointer"
                                picker="year"
                                suffixIcon={<FaChevronDown className="text-gray-500 text-sm" />}
                                onChange={(_, dateString) => {
                                    if (typeof dateString === 'string') {
                                        setSelectedYear(dateString);
                                    }
                                }}
                            />
                        </ConfigProvider>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={230}>
                    <AreaChart data={earningsData}>
                        <defs>
                            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00BCD1" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#A8E8EF" stopOpacity={0.4} />
                            </linearGradient>
                        </defs>
                        {/* <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /> */}
                        <XAxis dataKey="month" stroke="#999" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#999" style={{ fontSize: '12px' }} tickFormatter={(value) => `${value}`} />
                        <Tooltip
                            formatter={(value) => `$${value}`}
                            contentStyle={{
                                backgroundColor: '#f5f5f5',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 12px',
                            }}
                            labelStyle={{ color: '#c61f1f' }}
                        />
                        <Area
                            type="monotone"
                            name="Revenue"
                            dataKey="value"
                            stroke="#00BCD1"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorEarnings)"
                            activeDot={{ r: 6 }}
                            // dot={{ fill: '#00BCD1', r: 4 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default TotalEarning;
