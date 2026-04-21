import React, { useEffect, useState, useMemo } from 'react';
import {
    Search,
    Filter,
    Eye,
    Clock,
    ShoppingBag,
    IndianRupee,
    CheckCircle2,
    ArrowUpRight,
    User
} from 'lucide-react';
import { getAllOrders } from '../../../Services/Operation/sellerApi';
import { useDispatch } from 'react-redux';

export default function SellerOrders() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchOrders() {
            const response = await dispatch(getAllOrders());
            if (Array.isArray(response)) setOrders(response);
        }
        fetchOrders();
    }, [dispatch]);

    // --- Analytics Logic ---
    const stats = useMemo(() => {
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
        const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
        const delivered = orders.filter(o => o.status === 'Delivered').length;
        const fulfillmentRate = totalOrders > 0 ? ((delivered / totalOrders) * 100).toFixed(0) : 0;

        return { totalOrders, totalRevenue, pendingOrders, fulfillmentRate };
    }, [orders]);

    const filteredOrders = useMemo(() => {
        return orders.filter(o =>
            o.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o._id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [orders, searchTerm]);

    return (
        <div className="p-8 bg-[#f8fafc] min-h-screen text-slate-900 font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">
                        Order <span className="text-indigo-600">Center</span>
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium">Manage transactions and customer fulfillment.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
                    <button className="px-4 py-2 text-sm font-bold bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-100 transition-all">All Orders</button>
                    <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-all">Returns</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <OrderStatCard label="Total Orders" value={stats.totalOrders} icon={<ShoppingBag size={24} />} color="indigo" />
                <OrderStatCard label="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} icon={<IndianRupee size={24} />} color="emerald" />
                <OrderStatCard label="To Process" value={stats.pendingOrders} icon={<Clock size={24} />} color="amber" />
                <OrderStatCard label="Fulfillment" value={`${stats.fulfillmentRate}%`} icon={<CheckCircle2 size={24} />} color="rose" />
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search by Order ID or Customer name..."
                        className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white rounded-2xl text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 transition-all border border-slate-100">
                    <Filter size={18} /> <span>Advanced Filters</span>
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Transaction</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Payment</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order._id} className="group hover:bg-slate-50/50 transition-all">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                                    <ShoppingBag size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800">#{order._id.slice(-8).toUpperCase()}</p>
                                                    <p className="text-xs text-slate-400 font-semibold">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                                                    {order.user?.image ? <img src={order.user.image} alt="" /> : <User size={14} className="text-slate-400" />}
                                                </div>
                                                <div>
                                                    <span className="block font-bold text-slate-700 leading-none mb-1">{order.user?.firstName} {order.user?.lastName}</span>
                                                    <span className="text-[11px] text-slate-400 font-bold">{order.user?.email || "Guest User"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-900 tracking-tight">₹{order.totalAmount?.toLocaleString()}</span>
                                                <span className="text-[10px] font-bold text-indigo-500 uppercase">{order.itemsCount || 0} Products</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all group/btn">
                                                <span>Details</span>
                                                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 font-medium italic">
                                        No orders found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        Pending: "bg-amber-50 text-amber-600 border-amber-100",
        Processing: "bg-blue-50 text-blue-600 border-blue-100",
        Shipped: "bg-purple-50 text-purple-600 border-purple-100",
        Delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
        Cancelled: "bg-rose-50 text-rose-600 border-rose-100",
    };

    return (
        <span className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${styles[status] || "bg-slate-50 text-slate-500 border-slate-100"}`}>
            {status}
        </span>
    );
}

function OrderStatCard({ label, value, icon, color }) {
    const variants = {
        indigo: "from-indigo-600 to-blue-700 shadow-indigo-200",
        emerald: "from-emerald-600 to-teal-700 shadow-emerald-200",
        amber: "from-amber-500 to-orange-600 shadow-amber-200",
        rose: "from-rose-600 to-pink-700 shadow-rose-200"
    };

    return (
        <div className={`relative p-6 rounded-[1rem] bg-gradient-to-br ${variants[color]} text-white shadow-xl overflow-hidden group`}>
            <div className="relative z-10">
                <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md mb-4 group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
                <p className="text-3xl font-black tracking-tight">{value}</p>
            </div>
            
            {/* Design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-colors" />
            <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                {icon}
            </div>
        </div>
    );
}