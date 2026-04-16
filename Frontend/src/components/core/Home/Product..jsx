import { ChevronsRight } from "lucide-react";
import fetchData from "../../../hooks/fetchData";
import { useEffect, useState } from "react";
import { product } from "../../../Services/api";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProduct } from '../../../Redux/slices/productSlice';
const { GET_ALLPRODUCT_API } = product;

function Product() {
    let [data, setData] = useState([]);
    // const { products, setProduct } = useSelector(state => state.product);
    const dispatch = useDispatch();
    // console.log(products);


    useEffect(() => {
        async function main() {
            let url = GET_ALLPRODUCT_API;
            const val = await fetchData(url, 'GET');
            setData(val.products);
            await dispatch(setProduct(val.products));
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {data.map((ele) => (
                    <Link
                        to={'/product/ele.description'}
                        key={ele._id}
                        state={{ ele }}
                        className="group bg-white rounded-2xl p-3 border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#F3F4F6]">
                            <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
        </div>
    );
}

export default Product;