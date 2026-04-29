import React from 'react'
import { Link } from "react-router-dom";

export default function Card({data}) {
    return (
        <>
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
        </>
    )
}
