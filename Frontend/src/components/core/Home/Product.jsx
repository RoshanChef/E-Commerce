import { Car, ChevronsRight, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../Services/Operation/productApi";
import Card from "../../../Templete/Card";

function Product() {
    let [data, setData] = useState([]);
    let [electric, setElectric] = useState([]);

    useEffect(() => {
        async function main() {
            try {
                let val = await getAllProducts();

                // General Products
                const general = val.filter(ele => ele.category.categoryName !== "Electronics").slice(0, 10);
                setData(general);

                // Electronics
                const electronics = val.filter(ele => ele.category.categoryName === "Electronics");
                const maxItems = window.innerWidth <= 768 ? 6 : 10;
                setElectric(electronics.slice(0, maxItems));
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        }
        main();
    }, []);

    return (
        <div className="min-h-screen bg-[#FBFCFE] pt-28 pb-20 px-4 md:px-12 lg:px-20">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-10 text-xs md:text-sm text-gray-400 tracking-wide">
                <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                <ChevronsRight size={12} className="opacity-50" />
                <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                    All Collections
                </span>
            </nav>

            {/* Main Collection Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                        Featured <span className="text-indigo-600">Items</span>
                    </h2>
                    <p className="text-gray-500 mt-2 font-medium">Handpicked products for your lifestyle.</p>
                </div>
                <Link to="/shop" className="text-sm font-bold text-indigo-600 flex items-center gap-2 group">
                    View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Unified Grid - Using the Card component for consistency */}
            <div className="mb-20">
                <Card data={data} />
            </div>

            {/* Dynamic Earbuds Promo Banner */}
            <div className="group relative min-h-[320px] w-full my-16 bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 flex flex-col md:flex-row items-center justify-between px-10 md:px-20 overflow-hidden rounded-[1rem] shadow-2xl shadow-indigo-200 py-12 md:py-0">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl"></div>

                {/* Left content */}
                <div className="text-center md:text-left text-white z-20 relative">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                        <Sparkles size={16} className="text-indigo-200" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-100">
                            Limited Edition Release
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-tight">
                        Sonic <br className="hidden md:block" /> <span className="text-indigo-200">Pro Buds</span>
                    </h2>
                    <p className="text-indigo-50 opacity-80 max-w-sm mb-8 text-sm md:text-lg font-medium leading-relaxed">
                        Redefining silence with industry-leading ANC and 360 Spatial Audio.
                    </p>
                </div>

                {/* Right content: Product Image */}
                <div className="relative h-64 md:h-[400px] w-full md:w-1/2 flex items-center justify-center lg:justify-end mt-10 md:mt-0">
                    {/* Glowing Orb */}
                    <div className="absolute top-1/2 left-1/2 md:left-2/3 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-300 rounded-full blur-[90px] opacity-40 animate-pulse"></div>

                    {/* Main Image */}
                    <img
                        draggable={false}
                        src="/Earbuds2.png"
                        alt="Sonic Pro Buds"
                        className="h-56 md:h-80 lg:h-96 object-contain z-10 drop-shadow-[0_30px_50px_rgba(0,0,0,0.4)] transform hover:rotate-2 hover:scale-110 transition-all duration-700 ease-in-out cursor-pointer"
                    />

                    {/* Feature Pill */}
                    <div className="absolute bottom-10 right-0 md:right-10 z-20 bg-white/10 backdrop-blur-xl border border-white/20 text-white p-4 rounded-2xl shadow-2xl">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase text-indigo-200 font-bold">Battery Life</span>
                            <span className="text-xl font-black">48 Hours</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Electronics Section */}
            <div className="relative rounded-[1.5rem] bg-white border border-gray-100 p-8 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                        <Car size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Electronics Essentials</h3>
                        <p className="text-sm text-gray-400 font-medium">Cutting edge gear for the modern setup.</p>
                    </div>
                </div>

                <div className="relative z-10">
                    <Card data={electric} />
                </div>

                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                    <Car size={200} />
                </div>
            </div>
        </div>
    );
}

export default Product;