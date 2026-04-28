import { BaggageClaim, Search, User, X, Package2, UserRoundPen, LogOut, CreditCard, Heart, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Services/Operation/authApi';
import MoreDropdown from './Moredropdown';

function Navbar() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);

    const { signupData, role } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Change background opacity on scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-3 flex items-center justify-between transition-all duration-300
        ${isScrolled ? "bg-white/80 shadow-md backdrop-blur-lg" : "bg-white/40 backdrop-blur-sm"}`}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95">
                <div className="bg-indigo-600 p-1.5 rounded-lg shadow-indigo-200 shadow-lg">
                    <Package2 className="text-white" size={22} />
                </div>
                <span className=" text-sm md:text-xl font-bold tracking-tight text-slate-800">
                    Fikri<span className="text-indigo-600">Shop</span>
                </span>
            </Link>

            {/* Search Bar */}
            <div className="flex flex-1 items-center mx-10 max-w-2xl">
                <div className="flex items-center w-full bg-white/80 rounded-full px-4 py-2 border border-slate-200 
                    focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 
                    focus-within:bg-white transition-all duration-300 group">

                    <Search className="text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />

                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full bg-transparent outline-none text-sm px-3 text-slate-700 placeholder:text-slate-400"
                        placeholder="Search for products, brands and more..."
                    />

                    {searchValue && (
                        <button onClick={() => setSearchValue("")} className="hover:bg-slate-100 p-1 rounded-full transition">
                            <X className="text-slate-400 hover:text-slate-600" size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">

                {/* Cart Icon with Badge */}
                <Link to={'addToCart'} className="relative p-2.5 rounded-full hover:bg-slate-100 cursor-pointer transition-colors group">
                    <BaggageClaim size={22} className="text-slate-600 group-hover:text-indigo-600" />
                    {signupData?.cart?.length > 0 && <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                        {signupData?.cart?.length}
                    </span>}
                </Link>

                {signupData && role == 'customer' ? (
                    <div
                        className="relative"
                        onMouseEnter={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                    >
                        <div className="flex items-center gap-1 pl-2 py-1 pr-1 rounded-full hover:bg-slate-100 cursor-pointer transition-all border border-transparent hover:border-slate-200">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                {signupData.firstName?.charAt(0) || <User size={16} />}
                            </div>
                            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${show ? 'rotate-180' : ''}`} />
                        </div>

                        {/* Dropdown Menu */}
                        <div className={`absolute right-0 mt-0 w-56 bg-white border border-slate-100 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 origin-top-right
                        ${show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>

                            <div className="px-4 py-3 bg-slate-50/50 border-b border-slate-100">
                                <p className="text-xs text-slate-500 font-medium">Logged in as</p>
                                <p className="text-sm font-semibold text-slate-800 truncate">{signupData.email}</p>
                            </div>

                            <div className="p-1.5">
                                {[
                                    { icon: UserRoundPen, label: "Profile" },
                                    { icon: Package2, label: "Orders" },
                                    { icon: Heart, label: "Wishlist" },
                                    { icon: CreditCard, label: "Coupons" },
                                ].map((item, i) => (
                                    <button
                                        key={i}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-gradient-to-r hover:from-blue-200 cursor-pointer hover:to-white hover:text-indigo-600 transition-colors text-sm font-medium"
                                        onClick={() => {
                                            switch (item.label) {
                                                case "Profile":
                                                    navigate('/profile')
                                                    break;

                                                case "Orders":
                                                    navigate('/orders')
                                                    break;

                                                default:
                                                    break;
                                            }
                                        }}
                                    >
                                        <item.icon size={18} />
                                        {item.label}
                                    </button>
                                ))}

                                <div className="h-px bg-slate-100 my-1" />

                                <button
                                    onClick={() => dispatch(logout(navigate))}
                                    className="w-full cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg text-rose-600 hover:bg-gradient-to-r hover:from-red-200 hover:to-white transition-all duration-300transition-colors text-sm font-medium"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    !location.pathname.includes('login') &&
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-slate-900 cursor-pointer text-white px-6 py-2 rounded-sm text-sm font-semibold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95"
                    >
                        Login
                    </button>
                )}
                <MoreDropdown />
            </div>
        </nav>
    );
}

export default Navbar;