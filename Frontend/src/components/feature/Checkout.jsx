import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
    Truck, ShieldCheck, ArrowRight, CheckCircle2,
    Lock, Globe, CreditCard as CardIcon, Phone, Mail, User, MapPin
} from "lucide-react";

import {
    createOrder,
    placeOrder,
    verify_payment
} from "../../Services/Operation/productApi";

export default function Checkout() {
    const dispatch = useDispatch();
    const { signupData } = useSelector((state) => state.auth);
    const cartItems = signupData?.cart || [];

    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            name: signupData ? `${signupData.firstName} ${signupData.lastName}` : "",
            email: signupData?.email || "",
            phone: "",
            street: "",
            city: "",
            state: "",
            pincode: "",
            country: "India",
            paymentMethod: "online",
        },
    });

    const paymentMethod = watch("paymentMethod");

    // Calculation Constants
    const shippingFee = 0;
    const subtotal = cartItems.reduce((sum, item) => {
        const price = item.product.price;
        const discount = item.product.discount || 0;

        const finalPrice = price - (price * discount) / 100;
        return sum + finalPrice * item.quantity;
    }, 0);

    const totalAmount = subtotal + shippingFee + 10;
    console.log(totalAmount);

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const onSubmit = async (data) => {
        const orderData = {
            address: {
                street: data.street,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
            },
            items: cartItems,
            paymentMethod: data.paymentMethod,
            totalAmount,
        };

        try {
            if (data.paymentMethod === "cod") {
                await dispatch(placeOrder(orderData));
                toast.success("Order placed successfully via COD");
                return;
            }

            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            if (!res) {
                toast.error("Razorpay SDK failed to load");
                return;
            }

            const orderRes = await dispatch(createOrder(totalAmount));
            const order = orderRes.order;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                name: "Fikri Shop",
                description: "Premium Order Payment",
                handler: async function (response) {
                    const verifyRes = await dispatch(verify_payment(response));
                    if (verifyRes.success) {
                        await dispatch(placeOrder({
                            ...orderData,
                            paymentId: response.razorpay_payment_id,
                        }));
                        toast.success("Payment Received & Order Placed!");
                    } else {
                        toast.error("Payment verification failed");
                    }
                },
                prefill: { name: data.name, email: data.email, contact: data.phone },
                theme: { color: "#4F46E5" },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (err) {
            console.error(err);
            toast.error("Checkout process failed");
        }
    };

    // Refined Tailwind Classes
    const inputWrapper = "relative flex items-center";
    const inputIcon = "absolute left-4 text-slate-400 w-5 h-5";
    const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200 placeholder:text-slate-400 text-slate-700 shadow-sm";
    const sectionTitle = "text-lg font-bold text-slate-800 flex items-center gap-2 mb-6";

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-12">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: Checkout Form */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">

                            {/* Contact Section */}
                            <section>
                                <h2 className={sectionTitle}><User className="w-5 h-5 text-indigo-600" /> Personal Details</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className={inputWrapper + " md:col-span-2"}>
                                        <User className={inputIcon} />
                                        <input {...register("name", { required: true })} className={inputClasses} placeholder="Full Name" />
                                    </div>
                                    <div className={inputWrapper}>
                                        <Mail className={inputIcon} />
                                        <input {...register("email", { required: true })} className={inputClasses} placeholder="Email Address" />
                                    </div>
                                    <div className={inputWrapper}>
                                        <Phone className={inputIcon} />
                                        <input {...register("phone", { required: true })} className={inputClasses} placeholder="Phone Number" />
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Section */}
                            <section>
                                <h2 className={sectionTitle}><MapPin className="w-5 h-5 text-indigo-600" /> Shipping Address</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className={inputWrapper + " md:col-span-2"}>
                                        <MapPin className={inputIcon} />
                                        <input {...register("street", { required: true })} className={inputClasses} placeholder="Street Address" />
                                    </div>
                                    <input {...register("city", { required: true })} className={inputClasses.replace("pl-12", "pl-5")} placeholder="City" />
                                    <input  {...register("state", { required: true })} className={inputClasses.replace("pl-12", "pl-5")} placeholder="State" />
                                    <input  {...register("pincode", { required: true })} className={inputClasses.replace("pl-12", "pl-5")} placeholder="Pincode" />
                                    <input  {...register("country", { required: true })} className={inputClasses.replace("pl-12", "pl-5")} disabled placeholder="Country" />
                                </div>
                            </section>

                            {/* Payment Selection */}
                            <section>
                                <h2 className={sectionTitle}><CardIcon className="w-5 h-5 text-indigo-600" /> Payment Method</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                                        <div className="flex items-center gap-3">
                                            <CardIcon className={paymentMethod === 'online' ? 'text-indigo-600' : 'text-slate-400'} />
                                            <span className="font-semibold text-slate-700">Online Pay</span>
                                        </div>
                                        <input type="radio" value="online" {...register("paymentMethod")} className="accent-indigo-600 h-4 w-4" />
                                    </label>

                                    <label className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                                        <div className="flex items-center gap-3">
                                            <Truck className={paymentMethod === 'cod' ? 'text-indigo-600' : 'text-slate-400'} />
                                            <span className="font-semibold text-slate-700">Cash on Delivery</span>
                                        </div>
                                        <input type="radio" value="cod" {...register("paymentMethod")} className="accent-indigo-600 h-4 w-4" />
                                    </label>
                                </div>
                            </section>

                            <button
                                type="submit"
                                disabled={isSubmitting || cartItems.length === 0}
                                className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none flex items-center justify-center gap-2 group"
                            >
                                {isSubmitting ? "Processing..." : (
                                    <>
                                        {paymentMethod === "online" ? "Proceed to Secure Payment" : "Confirm Order"}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-10 space-y-6">
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    Order Summary
                                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">{cartItems.length} items</span>
                                </h2>

                                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cartItems.map((item) => {
                                        const finalPrice = item.product.price - (item.product.price * (item.product.discount || 0)) / 100;
                                        return (
                                            <div key={item._id} className="flex gap-4">
                                                <div className="flex-1">
                                                    <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{item.product.productName}</h3>
                                                    <p className="text-xs text-slate-500 mt-1">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="text-sm font-bold text-indigo-600 mt-2">₹{Math.round(finalPrice)}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                                    <div className="flex justify-between text-slate-500">
                                        <span>Subtotal</span>
                                        <span>₹{Math.round(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Shipping</span>
                                        <span className="text-orange-600 font-medium">{shippingFee ? '₹' + String(shippingFee) : "Free"}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Platform fees</span>
                                        <span className="text-green-600 font-medium">₹10</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-black text-slate-900 pt-3 border-t border-dashed border-slate-200">
                                        <span>Total</span>
                                        <span>₹{Math.round(totalAmount)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="bg-indigo-50 rounded-2xl p-6 flex items-start gap-4 border border-indigo-100">
                                <ShieldCheck className="w-6 h-6 text-indigo-600 mt-1" />
                                <div>
                                    <p className="text-sm font-bold text-indigo-900">Secure Checkout</p>
                                    <p className="text-xs text-indigo-700/70 mt-1">Your data is encrypted with 256-bit SSL security to ensure safe transactions.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}