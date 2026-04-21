import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add_To_Cart, decreaseCartQuantity, deleteFromCart, viewCart } from "../../Services/Operation/productApi";
import { Trash2, Minus, Plus, ShoppingBag, ShieldCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function AddToCart() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await dispatch(viewCart());
                setData(res?.data || []);
            } catch (error) {
                console.log("Cart Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [dispatch]);

    const subtotal = data.reduce(
        (total, item) => total
            + item.quantity * (item?.product?.price - (item?.product?.price*item?.product?.discount)/100 || 0),
        0
    );

    const platformFee = data.length > 0 ? 10 : 0;


    const handleIncrease = async (productId, size) => {
        // Optimistic UI update
        setData((prev) =>
            prev.map((item) =>
                item.product._id === productId && item.size === size
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );

        try {
            await dispatch(add_To_Cart(undefined, productId, size));
        } catch (error) {
            console.log(error);

            // rollback
            const res = await dispatch(viewCart());
            setData(res?.data || []);
        }
    };

    const handleDecrease = async (productId, size) => {
        // Optimistic UI update
        setData((prev) =>
            prev
                .map((item) =>
                    item.product._id === productId && item.size === size
                        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );

        try {
            await dispatch(decreaseCartQuantity(productId, size));
        } catch (error) {
            console.log(error);

            // rollback
            const res = await dispatch(viewCart());
            setData(res?.data || []);
        }
    };

    const handleDelete = async (productId, size, stock) => {
        // Optimistic UI remove
        setData((prev) =>
            prev.filter(
                (item) => !(item.product._id === productId && item.size === size)
            )
        );

        try {
            await dispatch(deleteFromCart(productId, size, stock));
        } catch (error) {
            console.log(error);

            // rollback
            const res = await dispatch(viewCart());
            setData(res?.data || []);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <p className="text-slate-500 font-semibold text-lg animate-pulse">
                    Loading your cart...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-10 bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
                {/* Left Cart */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="p-3 rounded-2xl bg-white shadow-md border border-slate-100">
                            <ShoppingBag className="text-indigo-600" size={24} />
                        </div>

                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                                Shopping Cart
                            </h1>
                            <p className="text-sm text-slate-500 font-medium">
                                Review your items before checkout
                            </p>
                        </div>

                        <span className="ml-auto px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
                            {data.length} ITEMS
                        </span>
                    </div>

                    {data.length === 0 ? (
                        <div className="bg-white rounded-[1rem] p-16 text-center shadow-md border border-slate-100">
                            <p className="text-slate-400 text-lg font-semibold">
                                Your cart is empty 😶
                            </p>
                            <p className="text-slate-500 mt-2 text-sm">
                                Looks like you haven’t added anything yet.
                            </p>

                            <button className="mt-8 px-10 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-indigo-600 transition-all shadow-md hover:shadow-indigo-200">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {data.map((ele) => (
                                <div
                                    key={ele?._id || ele?.product?._id}
                                    className="group bg-white p-6 rounded-[1rem] flex flex-col sm:flex-row gap-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-indigo-100 transition-all"
                                >
                                    {/* Image */}
                                    <div className="relative overflow-hidden rounded-xl bg-slate-100 w-32 h-32 flex-shrink-0">
                                        <img
                                            src={ele?.product?.images?.[0]}
                                            alt="product"
                                            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <span className="absolute top-2 left-2 px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold rounded-full shadow-sm">
                                            ₹{ele?.product?.price}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="flex flex-col flex-1 w-full">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                                                    {ele?.product?.productName}
                                                </h3>

                                                <p className="text-sm text-slate-500 mt-1 font-medium">
                                                    Size:{" "}
                                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 font-bold rounded-full text-xs uppercase border border-indigo-100">
                                                        {ele?.size || "N/A"}
                                                    </span>
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => handleDelete(ele.product._id, ele.size, ele.quantity)}
                                                className="p-2 cursor-pointer text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        {/* Bottom Row */}
                                        <div className="flex items-center justify-between mt-auto pt-5">
                                            {/* Counter */}
                                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-2 py-2 rounded-2xl shadow-sm">
                                                <button
                                                    onClick={() => handleDecrease(ele.product._id, ele.size)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition"
                                                >
                                                    <Minus size={15} />
                                                </button>

                                                <span className="w-10 text-center font-extrabold text-slate-900">
                                                    {ele?.quantity}
                                                </span>

                                                <button
                                                    onClick={() => handleIncrease(ele.product._id, ele.size)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border cursor-pointer border-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition"
                                                >
                                                    <Plus size={15} />
                                                </button>
                                            </div>

                                            {/* Total Price */}
                                            <div className="text-right">
                                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                                                    Total
                                                </p>
                                                <p className="text-2xl font-black text-slate-900">
                                                    ₹{(ele?.product?.price * ele?.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Summary */}
                <div className="lg:w-[380px] shrink-0">
                    <div className="bg-white/80 backdrop-blur-xl rounded-[1.5rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100 sticky top-28">
                        <h2 className="text-xl font-black text-slate-900 mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Subtotal</span>
                                <span className="text-slate-900 font-bold">
                                    ₹{subtotal.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Platform Fee</span>
                                <span className="text-slate-900 font-bold">₹{platformFee}</span>
                            </div>

                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Shipping</span>
                                <span className="text-emerald-600 font-extrabold">FREE</span>
                            </div>

                            <div className="border-t border-dashed border-slate-300 my-6" />

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-black text-slate-900">
                                    Total Amount
                                </span>
                                <span className="text-3xl font-black text-indigo-600">
                                    ₹{Math.round(subtotal + platformFee).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="mt-8 w-full cursor-pointer bg-slate-900 text-white py-4 rounded-2xl font-extrabold text-lg hover:bg-indigo-600 transition-all shadow-md hover:shadow-indigo-200 active:scale-[0.98]">
                            Checkout Now
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            Secure Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}