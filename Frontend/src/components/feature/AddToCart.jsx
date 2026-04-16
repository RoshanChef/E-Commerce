import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { viewCart } from "../../Services/Operation/productApi";

export default function AddToCart() {
    const location = useLocation();
    const product = location.state?.product;

    // const userFromStore = useSelector((state) => state.auth?.signupData);
    const dispatch = useDispatch();

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await dispatch(viewCart());
                setData(res.data);
            } catch (error) {
                console.log("Cart Fetch Error:", error);
            }
        };

        fetchCart();
    }, [dispatch]);

    console.log(data);

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* Cart section */}
            <div>
                
            </div>

            {/* Total Billing */}
            <div>

            </div>
        </div>
    );
}