import React from 'react';
import { Loan } from '../lib/types';

interface ChartProps {
    loans: Loan[];
}

export const MoneyLentChart: React.FC<ChartProps> = ({ loans }) => {
    // Aggregate lent amount by month
    const monthlyData = loans
        .filter(l => l.type === 'lent')
        .reduce((acc, loan) => {
            const month = loan.createdDate.toLocaleString('default', { month: 'short' });
            acc[month] = (acc[month] || 0) + loan.amount;
            return acc;
        }, {} as Record<string, number>);

    const data = Object.entries(monthlyData).map(([month, amount]) => ({ month, amount }));
    // Sort by month (simplified)
    const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    data.sort((a, b) => monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month));

    const maxAmount = Math.max(...data.map(d => d.amount), 1000);
    const height = 200;
    const width = 500;
    const padding = 40;

    const points = data.map((d, i) => {
        const x = padding + (i * (width - 2 * padding)) / (data.length - 1 || 1);
        const y = height - padding - (d.amount / maxAmount) * (height - 2 * padding);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="w-full h-full">
            <h3 className="text-gray-400 text-sm font-medium mb-4">Money Lent Over Time</h3>
            <div className="relative w-full h-64">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    {/* Grid lines */}
                    <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#374151" strokeWidth="1" />
                    <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#374151" strokeWidth="1" />

                    {/* Line */}
                    {data.length > 1 && (
                        <polyline
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            points={points}
                            className="drop-shadow-lg"
                        />
                    )}

                    {/* Points */}
                    {data.map((d, i) => {
                        const x = padding + (i * (width - 2 * padding)) / (data.length - 1 || 1);
                        const y = height - padding - (d.amount / maxAmount) * (height - 2 * padding);
                        return (
                            <g key={i} className="group">
                                <circle cx={x} cy={y} r="4" fill="#60a5fa" className="group-hover:r-6 transition-all" />
                                <text x={x} y={height - 10} textAnchor="middle" fill="#9ca3af" fontSize="10">{d.month}</text>
                                <text x={x} y={y - 10} textAnchor="middle" fill="white" fontSize="10" className="opacity-0 group-hover:opacity-100 transition-opacity">₹{d.amount}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};

export const BorrowerPerformanceChart: React.FC<ChartProps> = ({ loans }) => {
    // Mock reliability score based on repayment
    const borrowers = Array.from(new Set(loans.map(l => l.contactName)));
    const data = borrowers.map(name => {
        const userLoans = loans.filter(l => l.contactName === name);
        const total = userLoans.length;
        const settled = userLoans.filter(l => l.status === 'settled').length;
        const score = total > 0 ? (settled / total) * 100 : 0;
        return { name, score };
    }).slice(0, 5); // Top 5

    return (
        <div className="w-full h-full">
            <h3 className="text-gray-400 text-sm font-medium mb-4">Borrower Reliability</h3>
            <div className="space-y-4">
                {data.map((d, i) => (
                    <div key={i} className="relative">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-300">{d.name}</span>
                            <span className="text-blue-400">{Math.round(d.score)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                style={{ width: `${d.score}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
                {data.length === 0 && <p className="text-gray-500 text-xs">No borrower data yet.</p>}
            </div>
        </div>
    );
};

export const CategoryPieChart: React.FC<ChartProps> = ({ loans }) => {
    // Mock categories if not present in Loan type, or use loan type
    const data = [
        { name: 'Personal', value: loans.filter(l => l.type === 'lent').length, color: '#3b82f6' },
        { name: 'Business', value: loans.filter(l => l.type === 'borrowed').length, color: '#8b5cf6' },
        { name: 'Other', value: 0, color: '#10b981' }, // Placeholder
    ].filter(d => d.value > 0);

    const total = data.reduce((acc, d) => acc + d.value, 0);
    let currentAngle = 0;

    return (
        <div className="w-full h-full flex flex-col items-center">
            <h3 className="text-gray-400 text-sm font-medium mb-4">Loan Distribution</h3>
            <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {data.map((d, i) => {
                        const angle = (d.value / total) * 360;
                        const x1 = 50 + 40 * Math.cos((Math.PI * currentAngle) / 180);
                        const y1 = 50 + 40 * Math.sin((Math.PI * currentAngle) / 180);
                        const x2 = 50 + 40 * Math.cos((Math.PI * (currentAngle + angle)) / 180);
                        const y2 = 50 + 40 * Math.sin((Math.PI * (currentAngle + angle)) / 180);
                        const largeArc = angle > 180 ? 1 : 0;

                        const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
                        currentAngle += angle;

                        return (
                            <path
                                key={i}
                                d={path}
                                fill={d.color}
                                className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                        );
                    })}
                    {data.length === 0 && <circle cx="50" cy="50" r="40" fill="#374151" />}
                </svg>
                {/* Center hole for donut chart */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{total}</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-4">
                {data.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                        <span className="text-xs text-gray-400">{d.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
