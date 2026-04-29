import { useLocation } from "react-router-dom";
import { ChevronDown, Filter, Star, X, RotateCcw, PackageSearch } from "lucide-react";
import Card from "../../../Templete/Card";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Checkbox,
    FormControlLabel,
    Slider,
    Drawer,
    IconButton
} from '@mui/material';
import { useState, useMemo } from "react";

export default function MenuProduct() {
    const location = useLocation();
    const allProducts = location.state?.Result || [];

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [minRating, setMinRating] = useState(0);

    const categories = useMemo(() => {
        const rawCategories = allProducts.map(p =>
            typeof p.category === 'object' ? p.category.categoryName : p.category
        );
        return Array.from(new Set(rawCategories)).filter(Boolean);
    }, [allProducts]);

    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            const catName = typeof product.category === 'object'
                ? product.category.categoryName
                : product.category;

            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(catName);
            const matchesPrice =
                product.price >= priceRange[0] && product.price <= priceRange[1];
            const matchesRating =
                (product.rating || 0) >= minRating;

            return matchesCategory && matchesPrice && matchesRating;
        });
    }, [allProducts, selectedCategories, priceRange, minRating]);

    const handleCategoryChange = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setPriceRange([0, 2000]);
        setMinRating(0);
    };

    return (
        <div className="pt-16 md:pt-12 flex min-h-screen bg-slate-50/50">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-1/4 lg:w-1/5  top-20 h-[calc(100vh-5rem)] border-r border-slate-200 bg-white">
                <FilterSidebar
                    categories={categories}
                    selectedCategories={selectedCategories}
                    handleCategoryChange={handleCategoryChange}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    resetFilters={resetFilters}
                />
            </aside>

            {/* Mobile Button */}
            <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
                <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full shadow-2xl shadow-slate-400 font-bold active:scale-95 transition-transform"
                >
                    <Filter size={18} /> Filters
                </button>
            </div>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
                PaperProps={{ className: "w-[85%] max-w-xs rounded-r-2xl" }}
            >
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <span className="font-bold text-slate-800">Menu Filters</span>
                    <IconButton onClick={() => setIsMobileFilterOpen(false)} size="small" className="bg-slate-100">
                        <X size={18} />
                    </IconButton>
                </div>
                <FilterSidebar
                    categories={categories}
                    selectedCategories={selectedCategories}
                    handleCategoryChange={handleCategoryChange}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    resetFilters={resetFilters}
                />
            </Drawer>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <p className="text-slate-500 font-medium mt-1">
                            We found <span className="text-indigo-600 font-bold">{filteredProducts.length}</span> items for you
                        </p>
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <Card data={filteredProducts} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <div className="bg-slate-100 p-6 rounded-full mb-4">
                            <PackageSearch size={48} className="text-slate-400" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">No results found</h2>
                        <p className="text-slate-500 mb-6 px-10 text-center">Try adjusting your filters or search terms to find what you're looking for.</p>
                        <button 
                            onClick={resetFilters} 
                            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                        >
                            <RotateCcw size={18} /> Clear all filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

const FilterSidebar = ({
    categories,
    selectedCategories,
    handleCategoryChange,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    resetFilters
}) => (
    <div className="flex flex-col h-full bg-white">
        {/* Header - Styled like your "MORE" dropdown header */}
        <div className="p-5 flex items-center justify-between bg-slate-50/50 border-b border-slate-100">
            <div className="flex items-center gap-2">
                <Filter size={18} className="text-indigo-600" />
                <span className="font-black text-xs uppercase tracking-widest text-slate-800">Filters</span>
            </div>
            <button 
                onClick={resetFilters} 
                className="text-[11px] font-black uppercase tracking-tighter text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded-md transition-colors"
            >
                Reset
            </button>
        </div>

        <div className="overflow-y-auto px-2">
            {/* Category - Modernized Checkbox Row */}
            <Accordion 
                defaultExpanded 
                elevation={0} 
                disableGutters 
                className="before:hidden border-b border-slate-50"
            >
                <AccordionSummary expandIcon={<ChevronDown size={18} />}>
                    <Typography className="text-sm font-bold text-slate-700">Category</Typography>
                </AccordionSummary>
                <AccordionDetails className="px-1 pb-4">
                    <div className="flex flex-col gap-1">
                        {categories.map(cat => (
                            <label 
                                key={cat} 
                                className={`flex items-center px-3 py-2 rounded-xl cursor-pointer transition-all border border-transparent 
                                    ${selectedCategories.includes(cat) ? 'bg-indigo-50 border-indigo-100' : 'hover:bg-slate-50'}`}
                            >
                                <Checkbox
                                    size="small"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => handleCategoryChange(cat)}
                                    sx={{ padding: '4px', '&.Mui-checked': { color: '#4f46e5' } }}
                                />
                                <span className={`text-sm ml-2 ${selectedCategories.includes(cat) ? 'font-bold text-indigo-700' : 'text-slate-600 font-medium'}`}>
                                    {cat}
                                </span>
                            </label>
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>

            {/* Price - Refined Look */}
            <Accordion defaultExpanded elevation={0} disableGutters className="before:hidden border-b border-slate-50">
                <AccordionSummary expandIcon={<ChevronDown size={18} />}>
                    <Typography className="text-sm font-bold text-slate-700">Price Range</Typography>
                </AccordionSummary>
                <AccordionDetails className="px-4 pb-6">
                    <Slider
                        value={priceRange}
                        onChange={(e, val) => setPriceRange(val)}
                        min={0}
                        max={2000}
                        valueLabelDisplay="auto"
                        sx={{
                            color: '#4f46e5',
                            height: 6,
                            '& .MuiSlider-thumb': {
                                width: 20, height: 20, backgroundColor: '#fff', border: '3px solid currentColor',
                            },
                            '& .MuiSlider-rail': { opacity: 1, backgroundColor: '#f1f5f9' },
                        }}
                    />
                    <div className="flex justify-between mt-4">
                        <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex-1 max-w-[80px]">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Min</p>
                            <p className="text-xs font-bold text-slate-800">₹{priceRange[0]}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex-1 max-w-[80px] text-right">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Max</p>
                            <p className="text-xs font-bold text-slate-800">₹{priceRange[1]}</p>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>

            {/* Rating - Modern Stars */}
            <Accordion elevation={0} disableGutters className="before:hidden">
                <AccordionSummary expandIcon={<ChevronDown size={18} />}>
                    <Typography className="text-sm font-bold text-slate-700">Rating</Typography>
                </AccordionSummary>
                <AccordionDetails className="px-1 pb-4">
                    <div className="flex flex-col gap-1">
                        {[4, 3, 2].map((r) => (
                            <label
                                key={r}
                                className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all group
                                    ${minRating === r ? 'bg-indigo-50 border-indigo-100 border' : 'hover:bg-slate-50 border border-transparent'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        size="small"
                                        checked={minRating === r}
                                        onChange={() => setMinRating(minRating === r ? 0 : r)}
                                        sx={{ padding: '0', '&.Mui-checked': { color: '#4f46e5' } }}
                                    />
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                className={`${i < r ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                                            />
                                        ))}
                                        <span className="text-xs font-bold text-slate-500 ml-2">& up</span>
                                    </div>
                                </div>
                                {minRating === r && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]" />}
                            </label>
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    </div>
);