import {  ShoppingBag, Users, BarChart3, DollarSign,  MoreHorizontal, ArrowUpRight } from "lucide-react";


export default function Dashboard() {
    const stats = [
        {
            title: "Total Revenue",
            value: "$12,845.00",
            growth: "+12%",
            icon: <DollarSign className="text-emerald-500" />,
        },
        {
            title: "Orders Today",
            value: "25",
            growth: "+3%",
            icon: <ShoppingBag className="text-blue-500" />,
        },
        {
            title: "Visitors",
            value: "1,204",
            growth: "+18%",
            icon: <Users className="text-purple-500" />,
        },
        {
            title: "Conversion Rate",
            value: "3.2%",
            growth: "-1%",
            icon: <BarChart3 className="text-orange-500" />,
        },
    ];

    const recentOrders = [
        {
            id: "#8801",
            customer: "Alex Rivera",
            product: "Minimalist Chair",
            price: "$120",
            status: "Shipped",
        },
        {
            id: "#8802",
            customer: "Sarah Chen",
            product: "Ceramic Vase",
            price: "$45",
            status: "Pending",
        },
        {
            id: "#8803",
            customer: "Mike Ross",
            product: "Desk Lamp",
            price: "$89",
            status: "Processing",
        },
    ];
    return (
        <>
            <main className="flex-1 overflow-y-auto">
                {/* Header */}

                {/* Content */}
                <div className="p-8 max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Dashboard Overview
                            </h1>
                            <p className="text-slate-500 text-sm">
                                Welcome back! Here is what's happening today.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
                                    <span
                                        className={`text-xs font-bold px-2 py-1 rounded-md ${stat.growth.startsWith("+")
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-red-50 text-red-600"
                                            }`}
                                    >
                                        {stat.growth}
                                    </span>
                                </div>
                                <p className="text-slate-500 text-sm font-medium">
                                    {stat.title}
                                </p>
                                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                                    {stat.value}
                                </h3>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Orders Table */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-slate-800">Recent Orders</h3>
                                <button className="text-indigo-600 text-sm font-semibold hover:underline">
                                    View All
                                </button>
                            </div>

                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Order ID</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {recentOrders.map((order, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-50/50 transition-colors group"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                                {order.id}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {order.customer}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600">
                                                    {order.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm font-bold text-slate-800">
                                                {order.price}
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Right Side Cards */}
                        <div className="space-y-6">
                            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                                        <ArrowUpRight size={24} />
                                    </div>
                                    <h4 className="text-lg font-bold mb-2">Boost your sales!</h4>
                                    <p className="text-indigo-100 text-sm mb-4">
                                        Products with video reviews see a 40% higher conversion rate.
                                    </p>
                                    <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
                                        Add Video
                                    </button>
                                </div>
                                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <h4 className="font-bold text-slate-800 mb-4">
                                    Top Categories
                                </h4>
                                <div className="space-y-4">
                                    <CategoryProgress
                                        label="Home Decor"
                                        percent={75}
                                        color="bg-indigo-500"
                                    />
                                    <CategoryProgress
                                        label="Furniture"
                                        percent={45}
                                        color="bg-purple-500"
                                    />
                                    <CategoryProgress
                                        label="Lighting"
                                        percent={30}
                                        color="bg-orange-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

const CategoryProgress = ({ label, percent, color }) => (
    <div className="space-y-1">
        <div className="flex justify-between text-xs font-bold text-slate-600">
            <span>{label}</span>
            <span>{percent}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
                className={`${color} h-full rounded-full transition-all duration-1000`}
                style={{ width: `${percent}%` }}
            ></div>
        </div>
    </div>
);
