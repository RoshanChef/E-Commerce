import {
  CirclePower, User, Settings, ShoppingBag, Heart,
  ChevronRight, MapPin, Package, Shield, Bell,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { logout } from "../../../Services/Operation/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";


function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userFromStore = useSelector((state) => state.auth?.signupData);
  const data = userFromStore || JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("My Profile");

  const menuItems = [
    { icon: <User size={18} />, label: "My Profile" },
    { icon: <ShoppingBag size={18} />, label: "My Orders" },
    { icon: <Heart size={18} />, label: "Wishlist" },
    { icon: <Settings size={18} />, label: "Account Settings" },
  ];

  return (
    <div className="min-h-screen pt-18 pb-16 px-4 bg-slate-50/50">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <div className="w-full lg:w-[280px] space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  className="w-20 h-20 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                  src={data?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data?.firstName}`}
                  alt="profile"
                />
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {data?.firstName} {data?.lastName}
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-0.5 tracking-wider">
                  {data?.email}
                </p>
              </div>

              <div className="flex gap-2 w-full mt-6">
                <div className="flex-1 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Orders</p>
                  <p className="text-md font-bold text-slate-900">{0}</p>
                </div>
                <div className="flex-1 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Saved</p>
                  <p className="text-md font-bold text-slate-900">{0}</p>
                </div>
              </div>
            </div>
          </div>

          <nav className="bg-white rounded-2xl border border-slate-200 p-2">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(item.label)}
                className={`w-full cursor-pointer flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.label
                  ? "bg-indigo-600 text-white shadow-md shadow-slate-200"
                  : "text-slate-600 hover:bg-slate-50"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={activeTab === item.label ? "text-white" : "text-slate-400 group-hover:text-indigo-600"}>
                    {item.icon}
                  </div>
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>
                <ChevronRight size={14} className={activeTab === item.label ? "opacity-100" : "opacity-0"} />
              </button>
            ))}

            <div className="h-px bg-slate-100 my-2 mx-2" />

            <button
              onClick={() => dispatch(logout(navigate))}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-all font-semibold text-sm group"
            >
              <CirclePower size={18} className="text-rose-400 group-hover:text-rose-600" />
              Logout
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "My Profile" && <MyProfile data={data} />}
              {activeTab === "My Orders" && <MyOrders />}
              {activeTab === "Wishlist" && <Wishlist />}
              {activeTab === "Account Settings" && <AccountSettings data={data} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* --- SUB-COMPONENTS --- */
const InputGroup = ({ label, register, type = "text", placeholder = "" }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-0.5">
      {label}
    </label>
    <input
      {...register}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm text-slate-900 font-medium"
    />
  </div>
);

function MyProfile({ data }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { firstName: data?.firstName || "", lastName: data?.lastName || "" },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(info) {
    console.log(info);
    dispatch();
  }

  const faqs = [
    { q: "What happens when I update my email?", a: "Your login ID changes and communications move to the new address." },
    { q: "When will my account update?", a: "Changes reflect instantly after verification." },
  ];

  return (
    <div className="space-y-6 select-none">
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Shield size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
            <p className="text-sm text-slate-500">Update your profile identity and public details.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputGroup label="First Name" register={register("firstName")} />
            <InputGroup label="Last Name" register={register("lastName")} />
          </div>
          <div className="flex justify-end border-t border-slate-100 pt-6">
            <button className="bg-indigo-500 cursor-pointer hover:bg-indigo-600 text-white font-bold px-8 py-2.5 rounded-lg transition-all active:scale-95 text-sm">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {faqs.map((faq, i) => (
          <div key={i} className="p-5 rounded-xl bg-indigo-600 border border-slate-200">
            <h4 className="font-bold text-white text-sm mb-2">{faq.q}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccountSettings({ data }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { address: data?.address || {} },
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
          <MapPin size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Shipping Details</h2>
          <p className="text-sm text-slate-500">Manage where your orders are delivered.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit((d) => console.log(d))} className="space-y-5">
        <InputGroup label="Street Address" register={register("address.street")} placeholder="123 Luxury Lane" />
        <div className="grid grid-cols-2 gap-5">
          <InputGroup label="City" register={register("address.city")} />
          <InputGroup label="State" register={register("address.state")} />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <InputGroup label="Pincode" register={register("address.pincode")} />
          <InputGroup label="Country" register={register("address.country")} />
        </div>
        <button className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-all font-bold mt-4 text-sm">
          Update Address
        </button>
      </form>
    </div>
  );
}



/* Mocked components with reduced visual noise */
function MyOrders() {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
      <Package className="text-slate-300 mx-auto mb-4" size={48} />
      <h2 className="text-lg font-bold text-slate-900">No Orders Yet</h2>
      <p className="text-slate-500 text-sm mt-1">Ready to start shopping? Your history will appear here.</p>
      <button onClick={() => navigate('/')} className="mt-6 cursor-pointer px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-lg text-sm transition-all">
        Browse Products
      </button>
    </div>
  );
}

function Wishlist() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
      <Heart className="text-slate-300 mx-auto mb-4" size={48} />
      <h2 className="text-lg font-bold text-slate-900">Your wishlist is empty</h2>
      <p className="text-slate-500 text-sm mt-1">Save items you like to track them here.</p>
    </div>
  );
}

export default Profile;