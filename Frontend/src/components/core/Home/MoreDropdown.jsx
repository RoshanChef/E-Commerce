import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, HelpCircle, FileText, LifeBuoy, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MoreDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { label: "Become seller", icon: <HelpCircle size={14} />, onClick: () => navigate("/seller-ad") },
        { label: "Terms of Service", icon: <FileText size={14} />, onClick: () => navigate("/terms") },
        { label: "Privacy Policy", icon: <ShieldCheck size={14} />, onClick: () => navigate("/privacy") },
        { label: "Contact Support", icon: <LifeBuoy size={14} />, onClick: () => navigate("/support") },
    ];

    return (
        <div
            className="relative inline-block"
            ref={dropdownRef}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Trigger */}
            <div className="group text-xs flex gap-1 cursor-pointer items-center font-bold text-slate-400 tracking-widest hover:text-indigo-600 transition-colors select-none">
                <p>MORE</p>
                <ChevronRight
                    size={14}
                    className={`transition-all duration-300 ${isOpen ? "rotate-90 text-indigo-600" : "group-hover:text-indigo-600 group-hover:translate-x-0.5"
                        }`}
                />
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (   
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 pt-2 w-48 z-50"
                    >
                        <div className="bg-white border border-slate-200 rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] overflow-hidden p-1.5 cursor-pointer">
                            {menuItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        item.onClick();
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors group/item"
                                >
                                    <span className="text-slate-400 group-hover/item:text-indigo-500 transition-colors">
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default MoreDropdown;