import { ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../Services/Operation/productApi";

function Product() {
    let [data, setData] = useState([]);
    // let [earbuds, setEar] = useState([]);

    useEffect(() => {
        async function main() {
            let val = await getAllProducts();
            setData(val);

          // val= await getEarbuds(); 
        }
        main();
    }, []);

    return (
        <div className="min-h-screen bg-[#F9FAFB] pt-24 px-6 md:px-12">
            {/* Breadcrumbs/Category Header */}
            <div className="flex items-center gap-3 mb-8 text-sm text-gray-500">
                <Link to="/" className="hover:text-black transition-colors">Home</Link>
                <ChevronsRight size={14} />
                <span className="font-semibold text-black underline underline-offset-4 decoration-indigo-600">
                    All Collections
                </span>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {data?.map((ele) => (
                    <Link
                        to={'/product/ele.description'}
                        key={ele._id}
                        state={{ ele }}
                        className="group bg-white p-3 border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#F3F4F6]">
                            <img
                                className="w-full h-full object-cover transition-transform duration-500"
                                src={ele.images[0]}
                                alt={ele.productName}
                                loading="lazy"
                            />
                            {/* Simple Badge like "New" or "Best Seller" if needed */}
                            <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                New
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="mt-4 space-y-1">
                            <h3 className="text-[15px] font-medium text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                {ele.productName}
                            </h3>
                            <div className="flex items-center justify-between">
                                <p className="text-lg font-bold text-gray-900">
                                    ₹{ele.price.toLocaleString('en-IN')}
                                </p>
                                <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded text-xs font-bold text-green-700">
                                    <span>4.5</span>
                                    <span>★</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 font-medium">
                                Free Delivery
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* banner of earbuds */}
            <div className="min-h-[300px] md:h-54 w-full my-10 bg-indigo-600 flex flex-col md:flex-row items-center justify-between px-8 md:px-12 overflow-hidden rounded-xl shadow-xl relative py-8 md:py-0">

                {/* Left content: Text & Button */}
                <div className="text-center md:text-left text-white z-20 mb-8 md:mb-0">
                    <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest bg-indigo-500 px-3 py-1 rounded-full mb-3 inline-block">
                        Limited Edition
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight leading-tight">
                        Wireless <span className="text-indigo-200">Earbuds</span>
                    </h2>
                    <p className="text-indigo-100 opacity-90 max-w-xs mx-auto md:mx-0 mb-6 text-sm md:text-base">
                        Experience true freedom with premium sound quality and active noise cancellation.
                    </p>
                </div>

                {/* Right content: Layered Images */}
                <div className="relative h-48 md:h-full w-full md:w-1/2 flex items-center justify-center lg:justify-end">

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-48 md:h-48 bg-indigo-400 rounded-full blur-[60px] md:blur-[80px] opacity-40"></div>

                    <img
                        src="/Earbuds.png"
                        alt="earbuds background"
                        className="h-32 md:h-40 lg:h-48 object-contain absolute right-1/2 md:right-40 translate-x-1/2 md:translate-x-0 top-0 md:top-10 opacity-40 blur-[1px] transform -rotate-12 select-none"
                    />

                    {/* Primary Foreground Image */}
                    <img
                        draggable={false}
                        src="/Earbuds2.png"
                        alt="earbuds foreground"
                        className="h-40 md:h-48 lg:h-56 object-contain z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] transform rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out cursor-pointer"
                    />

                    {/* Floating Badge - Hidden on very small screens, visible from md up */}
                    <div className="hidden sm:block absolute bottom-4 md:bottom-10 right-4 md:right-10 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-xl">
                        24h Battery
                    </div>
                </div>

                <div className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
            </div>

            {/* Earbuds section */}
            <div>

            </div>


        </div>
    );
}

export default Product;