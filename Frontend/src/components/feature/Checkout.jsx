import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
    Truck, ShieldCheck, ArrowRight,
    CreditCard as CardIcon, Phone, Mail, User, MapPin
} from "lucide-react";

import {
    createOrder,
    placeOrder,
    verify_payment
} from "../../Services/Operation/productApi";

export default function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { signupData } = useSelector((state) => state.auth);
    const cartItems = signupData?.cart ?? [];

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            pincode: "",
            country: "India",
            paymentMethod: "online",
        },
    });

    // Reset form when signupData arrives
    useEffect(() => {
        if (signupData) {
            reset({
                name: `${signupData.firstName} ${signupData.lastName}`,
                email: signupData.email,
                country: "India",
                paymentMethod: "online"
            });
        }
    }, [signupData, reset]);

    const paymentMethod = watch("paymentMethod");

    // Calculations
    const shippingFee = 0;
    const subtotal = cartItems.reduce((sum, item) => {
        const price = item?.product?.price || 0;
        const discount = item?.product?.discount || 0;
        const finalPrice = price - (price * discount) / 100;
        return sum + finalPrice * item.quantity;
    }, 0);

    const totalAmount = Math.round(subtotal + shippingFee + 10);

    const onSubmit = async (data) => {
        if (cartItems.length === 0) {
            toast.error("Cart is empty");
            return;
        }


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
                await dispatch(placeOrder(orderData)).unwrap();
                toast.success("Order placed via COD");
                navigate("/orders");
                return;
            }

            // Create Razorpay order (Backend should return order object)
            const orderRes = await createOrder(totalAmount);
            console.log(orderRes);

            const order = orderRes.order;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: order.amount, // Should already be in paise from backend
                currency: order.currency,
                order_id: order.id,
                name: "Fikri Shop",
                description: "Order Payment",
                prefill: {
                    name: data.name,
                    email: data.email,
                    contact: data.phone,
                },
                theme: { color: "#4F46E5" },
                handler: async (response) => {
                    try {
                        // 1. Verify Payment
                        await verify_payment(response);

                        // 2. Place Order
                        await dispatch(placeOrder({
                            ...orderData,
                            paymentId: response.razorpay_payment_id,
                        }));

                        toast.success("Payment successful & order placed!");
                        navigate("/orders");
                    } catch (err) {
                        console.log(err);
                        toast.error("Verification failed but payment was taken. Contact support.");
                    }
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Checkout failed");
        }
    };

    // 🎨 Styles (Moved outside or kept as constants)
    const inputWrapper = "relative flex items-center";
    const inputIcon = "absolute left-4 text-slate-400 w-5 h-5";
    const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500";
    const sectionTitle = "text-lg font-bold text-slate-800 flex items-center gap-2 mb-6";

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-12">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* LEFT - Form */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 bg-white p-8 rounded-3xl shadow-sm">
                            <section>
                                <h2 className={sectionTitle}><User className="w-5 h-5 text-indigo-600" /> Personal Details</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className={`${inputWrapper} md:col-span-2`}>
                                        <User className={inputIcon} />
                                        <input {...register("name", { required: "Name is required" })} className={inputClasses} placeholder="Full Name" />
                                    </div>
                                    <div className={inputWrapper}>
                                        <Mail className={inputIcon} />
                                        <input type="email" {...register("email", { required: "Email is required" })} className={inputClasses} placeholder="Email" />
                                    </div>
                                    <div className={inputWrapper}>
                                        <Phone className={inputIcon} />
                                        <input type="tel" {...register("phone", { required: "Phone is required" })} className={inputClasses} placeholder="Phone" />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className={sectionTitle}><MapPin className="w-5 h-5 text-indigo-600" /> Address</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className={`${inputWrapper} md:col-span-2`}>
                                        <MapPin className={inputIcon} />
                                        <input {...register("street", { required: true })} className={inputClasses} placeholder="Street" />
                                    </div>
                                    <input {...register("city", { required: true })} className={inputClasses.replace("pl-12", "pl-5")} placeholder="City" />
                                    <input {...register("state", { required: true })} className={inputClasses.replace("pl-12", "pl-5")} placeholder="State" />
                                    <input {...register("pincode", { required: true })} className={inputClasses.replace("pl-12", "pl-5")} placeholder="Pincode" />
                                    <input {...register("country")} disabled className={inputClasses.replace("pl-12", "pl-5")} />
                                </div>
                            </section>

                            <section>
                                <h2 className={sectionTitle}><CardIcon className="w-5 h-5 text-indigo-600" /> Payment</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {["online", "cod"].map((method) => (
                                        <label key={method} className={`p-4 border-2 rounded-xl cursor-pointer flex justify-between items-center transition-all ${paymentMethod === method ? "border-indigo-600 bg-indigo-50" : "border-slate-100"}`}>
                                            <span className="capitalize font-medium">{method}</span>
                                            <input type="radio" value={method} {...register("paymentMethod")} className="w-4 h-4 text-indigo-600" />
                                        </label>
                                    ))}
                                </div>
                            </section>

                            <button
                                type="submit"
                                disabled={isSubmitting || cartItems.length === 0}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? "Processing..." : `Pay ₹${Math.round(totalAmount)}`}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT - Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-6 rounded-3xl shadow-sm sticky top-8">
                            <h2 className="text-xl font-bold mb-4">Order Summary ({cartItems.length})</h2>
                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                                {cartItems.map((item) => {
                                    const price = item?.product?.price || 0;
                                    const discount = item?.product?.discount || 0;
                                    const finalPrice = price - (price * discount) / 100;
                                    return (
                                        <div key={item._id} className="flex justify-between text-slate-600">
                                            <span className="text-sm line-clamp-1">{item.product.productName} × {item.quantity}</span>
                                            <span className="font-medium">₹{Math.round(finalPrice * item.quantity)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <hr className="my-4 border-slate-100" />
                            <div className="flex justify-between font-bold text-lg text-slate-900">
                                <span>Total Amount</span>
                                <span>₹{Math.round(totalAmount)}</span>
                            </div>
                            <div className="mt-6 p-4 bg-indigo-50 rounded-xl flex gap-3 items-center">
                                <ShieldCheck className="text-indigo-600 w-5 h-5" />
                                <p className="text-xs text-indigo-900 font-medium">Safe & Secure Payments. Easy returns.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}