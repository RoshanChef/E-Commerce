import React, { useEffect, useState } from 'react';
import {
    LayoutDashboard, Users, Ticket, Tag, ShoppingBag, Percent,
    Settings, LogOut, Menu, X, Search, MoreVertical, Trash2,
    DollarSign, TrendingUp, UserCheck, UserX, Eye, Clock,
    Plus, Edit, Activity, BarChart3, ChevronRight, Bell,
    Package, Star, Filter
} from 'lucide-react';
import { LineChart, PieChart } from '@mui/x-charts';
import { viewCategory, viewCoupons } from '../../../Services/Operation/categoryApi';

export default function AdminBoard() {
    // UI State
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMainTab, setActiveMainTab] = useState('dashboard');
    const [activeManageTab, setActiveManageTab] = useState('category');

    // Data States
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);

    const [coupons, setCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', expiryDate: '', minOrder: '' });

    const [sellers, setSellers] = useState([]);
    const [sellerActivity, setSellerActivity] = useState({});
    const [activityFilter, setActivityFilter] = useState('all');
    const [searchSeller, setSearchSeller] = useState('');

    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        activeSellers: 0,
        pendingSellers: 0,
        totalProducts: 0,
        totalCustomers: 0
    });

    const [revenueData] = useState([12500, 14200, 16800, 18900, 22400, 25800, 29100]);
    const [xLabels] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    const [recentActivities, setRecentActivities] = useState([]);

    // Sidebar navigation items - Flipkart style
    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-indigo-500' },
        { id: 'sellers', label: 'Sellers', icon: Users, color: 'text-emerald-500' },
        { id: 'categories', label: 'Categories', icon: Tag, color: 'text-amber-500' },
        { id: 'coupons', label: 'Coupons', icon: Percent, color: 'text-purple-500' },
        { id: 'orders', label: 'Orders', icon: ShoppingBag, color: 'text-blue-500' },
    ];



    const fetchAllData = async () => {
        try {
            const catData = await viewCategory();
            setCategories(Array.isArray(catData) ? catData : []);

            const couponData = await viewCoupons();
            setCoupons(Array.isArray(couponData) ? couponData : []);


            const activityMap = {};
            let totalRev = 0;
            let activeCount = 0;
            let pendingCount = 0;
            const allActivities = [];


            setSellerActivity(activityMap);
            setRecentActivities(allActivities.slice(0, 8));

            setStats({
                totalRevenue: totalRev,
                totalOrders: sellersList.reduce((acc, s) => acc + (activityMap[s.id]?.orders || 0), 0) || 0,
                activeSellers: activeCount,
                pendingSellers: pendingCount,
                totalProducts: sellersList.reduce((acc, s) => acc + (s.totalProducts || 0), 0) || 0,
                totalCustomers: 28450
            });

        } catch (err) {
            console.error("Failed to fetch data:", err);
            // Demo data for Flipkart-like experience
            setCategories([
                { _id: '1', categoryName: 'Electronics', image: '📱', count: 1245 },
                { _id: '2', categoryName: 'Fashion', image: '👕', count: 3421 },
                { _id: '3', categoryName: 'Home & Furniture', image: '🛋️', count: 1892 },
                { _id: '4', categoryName: 'Appliances', image: '🔌', count: 876 },
                { _id: '5', categoryName: 'Books & More', image: '📚', count: 2341 }
            ]);
            setCoupons([
                { _id: 'c1', code: 'FLIP10', discount: '10%', expiryDate: '2025-12-31', minOrder: '999', status: 'Active', usage: 1245 },
                { _id: 'c2', code: 'SAVE200', discount: '₹200', expiryDate: '2025-11-30', minOrder: '1499', status: 'Active', usage: 892 },
                { _id: 'c3', code: 'WELCOME50', discount: '50%', expiryDate: '2025-10-15', minOrder: '500', status: 'Expired', usage: 3456 }
            ]);
            setSellers([
                { id: '101', name: 'Astra Electronics', email: 'astra@example.com', status: 'Active', joinDate: '2024-01-15', totalProducts: 245, rating: 4.5, sales: 45200 },
                { id: '102', name: 'Fashion Hub', email: 'fashion@example.com', status: 'Pending', joinDate: '2024-03-20', totalProducts: 12, rating: 0, sales: 0 },
                { id: '103', name: 'Zenith Home Decor', email: 'zenith@example.com', status: 'Active', joinDate: '2023-11-05', totalProducts: 890, rating: 4.8, sales: 112000 },
                { id: '104', name: 'Global Gadgets', email: 'gadgets@example.com', status: 'Blocked', joinDate: '2024-02-10', totalProducts: 56, rating: 2.5, sales: 3200 },
                { id: '105', name: 'Trendy Wear', email: 'trendy@example.com', status: 'Active', joinDate: '2024-04-01', totalProducts: 178, rating: 4.2, sales: 28700 }
            ]);
            setSellerActivity({
                '101': { sales: 45200, orders: 342, lastActive: '2025-04-29T10:30:00Z', status: 'Active' },
                '102': { sales: 0, orders: 0, lastActive: '2025-04-28T08:00:00Z', status: 'Pending' },
                '103': { sales: 112000, orders: 892, lastActive: '2025-04-30T09:15:00Z', status: 'Active' },
                '104': { sales: 3200, orders: 12, lastActive: '2025-04-25T14:20:00Z', status: 'Blocked' },
                '105': { sales: 28700, orders: 234, lastActive: '2025-04-29T16:45:00Z', status: 'Active' }
            });
            setStats({
                totalRevenue: 189100,
                totalOrders: 1480,
                activeSellers: 3,
                pendingSellers: 1,
                totalProducts: 1381,
                totalCustomers: 28450
            });
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []); 


    // Category Management
    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;
        try {
            const newCat = await apiAddCategory({ categoryName: newCategory });
            setCategories([...categories, newCat]);
            setNewCategory('');
        } catch (err) {
            const tempCat = { _id: Date.now().toString(), categoryName: newCategory, count: 0 };
            setCategories([...categories, tempCat]);
            setNewCategory('');
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await apiDeleteCategory(id);
            setCategories(categories.filter(c => c._id !== id));
        } catch (err) {
            setCategories(categories.filter(c => c._id !== id));
        }
    };

    // Coupon Management
    const handleAddCoupon = async () => {
        if (!newCoupon.code || !newCoupon.discount) return;
        try {
            const couponPayload = {
                code: newCoupon.code.toUpperCase(),
                discount: newCoupon.discount,
                expiryDate: newCoupon.expiryDate || null,
                minOrder: newCoupon.minOrder || 0,
                status: 'Active'
            };
            const added = await apiAddCoupon(couponPayload);
            setCoupons([...coupons, added]);
            setNewCoupon({ code: '', discount: '', expiryDate: '', minOrder: '' });
        } catch (err) {
            const tempCoupon = { _id: Date.now().toString(), ...newCoupon, code: newCoupon.code.toUpperCase(), status: 'Active', usage: 0 };
            setCoupons([...coupons, tempCoupon]);
            setNewCoupon({ code: '', discount: '', expiryDate: '', minOrder: '' });
        }
    };

    const handleDeleteCoupon = async (id) => {
        try {
            await apiDeleteCoupon(id);
            setCoupons(coupons.filter(c => c._id !== id));
        } catch (err) {
            setCoupons(coupons.filter(c => c._id !== id));
        }
    };

    const updateSellerStatus = async (sellerId, newStatus) => {
        setSellers(sellers.map(s => s.id === sellerId ? { ...s, status: newStatus } : s));
        const activeCount = sellers.filter(s => (s.id === sellerId ? newStatus === 'Active' : s.status === 'Active')).length;
        const pendingCount = sellers.filter(s => (s.id === sellerId ? newStatus === 'Pending' : s.status === 'Pending')).length;
        setStats(prev => ({ ...prev, activeSellers: activeCount, pendingSellers: pendingCount }));
    };

    const filteredSellers = sellers.filter(seller => {
        const matchesSearch = seller.name.toLowerCase().includes(searchSeller.toLowerCase()) ||
            seller.email?.toLowerCase().includes(searchSeller.toLowerCase());
        if (activityFilter === 'all') return matchesSearch;
        return matchesSearch && seller.status.toLowerCase() === activityFilter.toLowerCase();
    });

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };

    const formatCurrency = (amount) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    // Render different content based on active tab
    const renderContent = () => {
        switch (activeMainTab) {
            case 'dashboard':
                return renderDashboard();
            case 'sellers':
                return renderSellersTable();
            case 'categories':
                return renderCategoriesManagement();
            case 'coupons':
                return renderCouponsManagement();
            default:
                return renderDashboard();
        }
    };

    const renderDashboard = () => (
        <>
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                        <div><p className="text-gray-500 text-sm">Total Revenue</p><p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</p></div>
                        <div className="bg-indigo-100 p-3 rounded-xl"><DollarSign className="text-indigo-600" size={24} /></div>
                    </div>
                    <div className="mt-2 text-xs text-green-600 flex items-center">↑ 12.5% from last week</div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div><p className="text-gray-500 text-sm">Total Orders</p><p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p></div>
                        <div className="bg-emerald-100 p-3 rounded-xl"><ShoppingBag className="text-emerald-600" size={24} /></div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div><p className="text-gray-500 text-sm">Active Sellers</p><p className="text-2xl font-bold text-gray-800">{stats.activeSellers}</p></div>
                        <div className="bg-blue-100 p-3 rounded-xl"><Users className="text-blue-600" size={24} /></div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div><p className="text-gray-500 text-sm">Total Customers</p><p className="text-2xl font-bold text-gray-800">{stats.totalCustomers.toLocaleString()}</p></div>
                        <div className="bg-purple-100 p-3 rounded-xl"><Star className="text-purple-600" size={24} /></div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-indigo-500" /> Revenue Overview (Last 7 Days)</h2>
                    <LineChart xAxis={[{ data: xLabels, scaleType: 'point' }]} series={[{ data: revenueData, area: true, color: '#6366f1' }]} height={280} />
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="font-semibold mb-4 flex items-center gap-2"><BarChart3 size={18} className="text-amber-500" /> Category Distribution</h2>
                    <PieChart series={[{
                        data: categories.slice(0, 5).map((cat, idx) => ({ value: 30 - idx * 3, label: cat.categoryName?.slice(0, 12) || 'Category' })),
                        innerRadius: 40,
                        outerRadius: 90,
                    }]} height={240} slotProps={{ legend: { direction: 'column', position: { vertical: 'middle', horizontal: 'right' } } }} />
                </div>
            </div>

            {/* Recent Activity & Top Sellers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <h3 className="font-semibold mb-4 flex items-center gap-2"><Activity size={18} /> Recent Seller Activity</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {recentActivities.map((act, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm border-b pb-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center"><Users size={14} className="text-indigo-600" /></div>
                                <div className="flex-1"><p className="font-medium">{act.sellerName}</p><p className="text-gray-500 text-xs">{act.action}</p></div>
                                <div className="text-xs text-gray-400">{formatDate(act.time)}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <h3 className="font-semibold mb-4 flex items-center gap-2"><Star size={18} /> Top Performing Sellers</h3>
                    <div className="space-y-3">
                        {sellers.filter(s => s.status === 'Active').sort((a, b) => (sellerActivity[b.id]?.sales || 0) - (sellerActivity[a.id]?.sales || 0)).slice(0, 4).map(seller => (
                            <div key={seller.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">{seller.name.charAt(0)}</div><div><p className="font-medium text-sm">{seller.name}</p><p className="text-xs text-gray-400">{seller.totalProducts} products</p></div></div>
                                <div className="text-right"><p className="font-semibold text-sm">{formatCurrency(sellerActivity[seller.id]?.sales || 0)}</p><div className="flex items-center text-xs text-yellow-500">★ {seller.rating || 4.5}</div></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

    const renderSellersTable = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 flex flex-wrap justify-between items-center gap-3 border-b">
                <h3 className="font-bold flex gap-2 text-lg"><Users className="text-indigo-500" /> Seller Management</h3>
                <div className="flex gap-3">
                    <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" /><input value={searchSeller} onChange={(e) => setSearchSeller(e.target.value)} className="pl-9 pr-3 py-2 border rounded-lg text-sm w-48" placeholder="Search seller..." /></div>
                    <select value={activityFilter} onChange={(e) => setActivityFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm bg-white"><option value="all">All Status</option><option value="active">Active</option><option value="pending">Pending</option><option value="blocked">Blocked</option></select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 text-gray-600 text-sm"><tr><th className="p-4 text-left">Seller</th><th className="p-4 text-left">Status</th><th className="p-4 text-left">Products</th><th className="p-4 text-left">Sales</th><th className="p-4 text-left">Rating</th><th className="p-4 text-left">Last Active</th><th className="p-4 text-left">Actions</th></tr></thead>
                    <tbody>
                        {filteredSellers.map((seller) => {
                            const activity = sellerActivity[seller.id] || { sales: 0, orders: 0, lastActive: seller.joinDate };
                            return (<tr key={seller.id} className="border-t hover:bg-gray-50 transition"><td className="p-4"><div><p className="font-semibold">{seller.name}</p><p className="text-xs text-gray-400">{seller.email}</p></div></td>
                                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${seller.status === 'Active' ? 'bg-green-100 text-green-700' : seller.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{seller.status}</span></td>
                                <td className="p-4">{seller.totalProducts || 0}</td><td className="p-4 font-mono font-semibold">{formatCurrency(activity.sales || 0)}</td>
                                <td className="p-4"><div className="flex items-center gap-1 text-yellow-500">★ <span className="text-gray-700">{seller.rating || (activity.sales > 0 ? '4.2' : 'N/A')}</span></div></td>
                                <td className="p-4 text-sm">{formatDate(activity.lastActive)}</td>
                                <td className="p-4 flex gap-2">{seller.status === 'Pending' && <button onClick={() => updateSellerStatus(seller.id, 'Active')} className="text-green-600 hover:bg-green-50 p-1 rounded"><CheckCircle size={18} /></button>}{seller.status === 'Active' && <button onClick={() => updateSellerStatus(seller.id, 'Blocked')} className="text-red-500 hover:bg-red-50 p-1 rounded"><UserX size={18} /></button>}<button className="text-gray-400 hover:text-indigo-600"><Eye size={18} /></button></td></tr>);
                        })}
                        {filteredSellers.length === 0 && <tr><td colSpan="7" className="p-8 text-center text-gray-400">No sellers found</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderCategoriesManagement = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-lg flex gap-2"><Tag className="text-amber-500" /> Categories</h3><button onClick={() => setActiveManageTab('category')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"><Plus size={16} /> Add Category</button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (<div key={cat._id} className="border rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"><div className="flex items-center gap-3"><div className="text-2xl">{cat.image || '📦'}</div><div><p className="font-semibold">{cat.categoryName}</p><p className="text-xs text-gray-400">{cat.count || 0} products</p></div></div><button onClick={() => handleDeleteCategory(cat._id)} className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button></div>))}
            </div>
            {editingCategory || activeManageTab === 'category' ? <div className="mt-6 p-4 bg-gray-50 rounded-xl"><p className="font-medium mb-3">Add New Category</p><div className="flex gap-2"><input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="border rounded-lg p-2 flex-1" placeholder="Category name" /><button onClick={handleAddCategory} className="bg-indigo-600 text-white px-4 rounded-lg">Add</button><button onClick={() => { setEditingCategory(null); setNewCategory(''); setActiveManageTab(''); }} className="text-gray-500 px-3">Cancel</button></div></div> : null}
        </div>
    );

    const renderCouponsManagement = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-lg flex gap-2"><Percent className="text-purple-500" /> Coupons</h3><button onClick={() => setActiveManageTab('coupon')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"><Plus size={16} /> Create Coupon</button></div>
            {activeManageTab === 'coupon' && <div className="mb-6 p-4 bg-gray-50 rounded-xl"><p className="font-medium mb-3">Create New Coupon</p><div className="grid grid-cols-2 md:grid-cols-4 gap-3"><input value={newCoupon.code} onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })} className="border p-2 rounded-lg text-sm" placeholder="Code" /><input value={newCoupon.discount} onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })} className="border p-2 rounded-lg text-sm" placeholder="Discount" /><input type="date" value={newCoupon.expiryDate} onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })} className="border p-2 rounded-lg text-sm" /><input value={newCoupon.minOrder} onChange={(e) => setNewCoupon({ ...newCoupon, minOrder: e.target.value })} className="border p-2 rounded-lg text-sm" placeholder="Min Order" /></div><button onClick={handleAddCoupon} className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm w-full">Generate Coupon</button></div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coupons.map((c) => (<div key={c._id} className="border rounded-xl p-4"><div className="flex justify-between items-start"><div><p className="font-bold text-lg tracking-wider">{c.code}</p><p className="text-sm text-gray-600">Discount: {c.discount}</p><p className="text-xs text-gray-400">Min Order: ₹{c.minOrder || 0} | Used: {c.usage || 0} times</p></div><span className={`text-xs px-2 py-1 rounded-full ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{c.status}</span></div><div className="flex justify-end mt-3 gap-2"><button onClick={() => handleDeleteCoupon(c._id)} className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1"><Trash2 size={14} /> Delete</button></div></div>))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* FLIPKART STYLE STICKY SIDEBAR */}
            <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-30 flex flex-col overflow-y-auto border-r border-gray-100">
                {/* Logo Section */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center"><ShoppingBag className="text-white" size={18} /></div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AdminMart</h1>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Flipkart Style Dashboard</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-4">
                    <div className="space-y-1">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveMainTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeMainTab === item.id ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <item.icon size={20} className={activeMainTab === item.id ? 'text-indigo-600' : item.color} />
                                <span className="font-medium">{item.label}</span>
                                {item.id === 'orders' && <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">12</span>}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition">
                            <Settings size={20} /> <span className="font-medium">Settings</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition">
                            <LogOut size={20} /> <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </nav>

                {/* Admin Profile */}
                <div className="p-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center"><Users size={20} className="text-indigo-600" /></div>
                        <div><p className="text-sm font-semibold">Admin User</p><p className="text-xs text-gray-400">admin@flipkart.com</p></div>
                    </div>
                </div>
            </aside>

            {/* Mobile Header & Toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center"><ShoppingBag className="text-white" size={18} /></div><h1 className="text-lg font-bold">AdminMart</h1></div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg bg-gray-100"><Menu size={20} /></button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
                    <div className="fixed left-0 top-0 h-full w-72 bg-white z-50 lg:hidden shadow-xl overflow-y-auto">
                        <div className="p-4 border-b flex justify-between items-center"><div className="flex items-center gap-2"><div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center"><ShoppingBag className="text-white" size={18} /></div><h1 className="text-lg font-bold">AdminMart</h1></div><button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><X size={20} /></button></div>
                        <nav className="py-4 px-3">
                            {sidebarItems.map((item) => (<button key={item.id} onClick={() => { setActiveMainTab(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 ${activeMainTab === item.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600'}`}><item.icon size={20} /><span>{item.label}</span></button>))}
                        </nav>
                    </div>
                </>
            )}

            {/* Main Content Area with margin for sidebar */}
            <main className="flex-1 lg:ml-72 min-h-screen">
                <div className="p-6 lg:p-8 mt-14 lg:mt-0">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}