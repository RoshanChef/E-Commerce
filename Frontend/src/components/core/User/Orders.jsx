import { Search, Package, RotateCcw, HelpCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { viewOrders } from "../../../Services/Operation/productApi";
import Invoice from "../../../Templete/Invoice";

const statusTheme = {
    Delivered: "text-emerald-600 bg-emerald-50",
    Processing: "text-blue-600 bg-blue-50",
    Cancelled: "text-rose-600 bg-rose-50",
};

export default function CustomerOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeOrder, setActiveOrder] = useState(null); // Track which order to show in invoice
    const [viewInvoice, setInvoice] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            const result = await dispatch(viewOrders());
            if (result?.orders) {
                setOrders(result.orders);
            }
            setLoading(false);
        };
        fetchUserData();
    }, [dispatch]);

    // Handle opening invoice
    const handleViewInvoice = (order) => {
        setActiveOrder(order);
        setInvoice(true);
    };

    // If viewing invoice, render only that component
    if (viewInvoice && activeOrder) {
        return <Invoice order={activeOrder} setInvoice={setInvoice} />;
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans">
            <div className="max-w-4xl mx-auto pt-10">

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search all orders..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-slate-100 transition-all shadow-sm"
                        />
                    </div>
                    <select className="px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none text-slate-600 font-medium shadow-sm cursor-pointer">
                        <option>Last 3 months</option>
                        <option>2026</option>
                        <option>2025</option>
                    </select>
                </div>

                {/* Order List Logic */}
                <div className="space-y-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                            <p className="mt-4 text-slate-500 font-medium">Fetching your orders...</p>
                        </div>
                    ) : orders && orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                {/* Card Header */}
                                <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex gap-8 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        <div>
                                            <p className="mb-0.5 text-slate-400">Date</p>
                                            <p className="text-slate-900">
                                                {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="mb-0.5 text-slate-400">Total</p>
                                            <p className="text-slate-900">₹{order.totalAmount || order.total}</p>
                                        </div>
                                        <div>
                                            <p className="mb-0.5 text-slate-400">Order ID</p>
                                            <p className="text-slate-900">{order._id?.slice(-8).toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleViewInvoice(order)}
                                        className="text-sm cursor-pointer font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                                    >
                                        View Invoice
                                    </button>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Product Image */}
                                        <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center text-4xl border border-slate-50 overflow-hidden">
                                            {order.products?.[0]?.product?.image ? (
                                                <img
                                                    src={order.products[0].product.image}
                                                    alt="product"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : <Package className="w-8 h-8 text-slate-300" />}
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">
                                                    {order.products?.[0]?.product?.name || "Order Items"}
                                                    {order.products?.length > 1 && ` +${order.products.length - 1} more`}
                                                </h3>
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusTheme[order.status] || "bg-gray-100 text-gray-600"}`}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                    {order.status}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Primary Actions */}
                                        <div className="flex flex-col gap-2 min-w-[160px]">
                                            <button className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                                                Track Order
                                            </button>
                                            <button className="w-full bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                                                <RotateCcw className="w-4 h-4" />
                                                Buy it again
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Secondary Actions Footer */}
                                <div className="px-6 py-3 bg-white border-t border-slate-100 flex gap-6">
                                    <button className="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                                        <HelpCircle className="w-3.5 h-3.5" />
                                        Get Help
                                    </button>
                                    <button className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                                        Write a review
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                            <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500 font-medium">You haven't placed any orders yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}