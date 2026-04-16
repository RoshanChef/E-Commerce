import { useEffect, useState } from "react";
import { Package, Upload, Plus, Trash2, DollarSign, Tag } from "lucide-react";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { viewCategory } from "../../../Services/Operation/categoryApi";
import { createProduct } from "../../../Services/Operation/productApi";

function AddProduct() {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            productName: "",
            description: "",
            price: "",
            discount: 0,
            category: "",
            sizes: [{ size: "", stock: "" }],
            images: [], // store FILES here
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sizes",
    });

    const images = watch("images"); // will be File objects

    const [categories, setCategory] = useState([]);
    const [previewImages, setPreviewImages] = useState([]); // store preview urls

    // Fetch Categories
    useEffect(() => {
        async function main() {
            let val = await dispatch(viewCategory());
            setCategory(val);
        }
        main();
    }, [dispatch]);

    // Handle Images Upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        if (!files.length) return;

        // store file objects for backend
        setValue("images", [...images, ...files]);

        // store preview urls for UI
        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages((prev) => [...prev, ...previews]);
    };

    const removeImage = (index) => {
        // remove file
        const updatedFiles = images.filter((_, i) => i !== index);
        setValue("images", updatedFiles);

        // remove preview
        const updatedPreviews = previewImages.filter((_, i) => i !== index);

        // revoke removed preview url
        URL.revokeObjectURL(previewImages[index]);

        setPreviewImages(updatedPreviews);
    };

    // Submit Form
    const onSubmit = async (data) => {
        if (data.images.length < 4) {
            return toast.error("Minimum 4 images required");
        }

        try {
            const payload = {
                productName: data.productName,
                description: data.description,
                price: Number(data.price),
                discount: Number(data.discount),
                category: data.category,
                sizes: data.sizes.map((s) => ({
                    size: s.size,
                    stock: Number(s.stock),
                })),
                images: data.images, // files
            };

            const formData = new FormData();

            formData.append("productName", payload.productName);
            formData.append("description", payload.description);
            formData.append("price", payload.price);
            formData.append("discount", payload.discount);
            formData.append("category", payload.category);
            formData.append("sizes", JSON.stringify(payload.sizes));

            payload.images.forEach((file) => {
                formData.append("images", file);
            });

            await dispatch(createProduct(formData));

            toast.success("Product created successfully!");

            // cleanup previews
            previewImages.forEach((url) => URL.revokeObjectURL(url));

            setPreviewImages([]);
            reset();
        } catch (error) {
            console.log(error.message);
            toast.error("Server error. Try again later.");
        }
    };

    const handleDiscard = () => {
        previewImages.forEach((url) => URL.revokeObjectURL(url));
        setPreviewImages([]);
        reset();
        toast.info("Form cleared");
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 flex justify-center">
            <div className="w-full max-w-5xl bg-white shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Package className="w-6 h-6" />
                        Add Product
                    </h2>
                    <p className="text-sm mt-1">
                        Create a new product listing for your storefront.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Product Name*
                            </label>

                            <input
                                type="text"
                                {...register("productName", {
                                    required: "Product name is required",
                                })}
                                placeholder="e.g. Premium Indigo Hoodie"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />

                            {errors.productName && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.productName.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Description
                            </label>

                            <textarea
                                rows="5"
                                {...register("description")}
                                placeholder="Tell your customers about this item..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                            />
                        </div>

                        {/* Price + Discount */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" /> Price*
                                </label>

                                <input
                                    type="number"
                                    {...register("price", { required: "Price is required" })}
                                    placeholder="0"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />

                                {errors.price && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                                    <Tag className="w-4 h-4" /> Discount (%)
                                </label>

                                <input
                                    type="number"
                                    {...register("discount")}
                                    placeholder="0"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Category
                            </label>

                            <select
                                {...register("category", { required: "Category is required" })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option value="">Select category</option>

                                {categories?.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>

                            {errors.category && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Images */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Product Images (Min. 4)*
                            </label>

                            <label className="border-2 border-dashed border-indigo-200 rounded-xl p-6 text-center bg-indigo-50/30 hover:bg-indigo-50 transition-colors cursor-pointer block">
                                <Upload className="w-10 h-10 text-indigo-400 mx-auto mb-2" />
                                <p className="text-sm text-indigo-600 font-semibold">
                                    Click to upload images
                                </p>

                                <p className="text-xs text-slate-400 mt-1">
                                    JPG, PNG (min 4 images)
                                </p>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </label>

                            {/* Preview */}
                            {previewImages?.length > 0 && (
                                <div className="grid grid-cols-4 gap-3 mt-4">
                                    {previewImages.map((img, index) => (
                                        <div
                                            key={index}
                                            className="relative group border border-slate-200 rounded-xl overflow-hidden"
                                        >
                                            <img
                                                src={img}
                                                alt="preview"
                                                className="h-20 w-full object-cover"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 bg-white/90 p-1 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p className="text-xs mt-2 text-slate-500">
                                Uploaded:{" "}
                                <span className="font-bold text-indigo-600">
                                    {images?.length || 0}
                                </span>{" "}
                                / 4 minimum
                            </p>
                        </div>

                        {/* Sizes */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-semibold text-slate-700">
                                    Sizes & Stock
                                </label>

                                <button
                                    type="button"
                                    onClick={() => append({ size: "", stock: "" })}
                                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                                >
                                    <Plus className="w-3 h-3" /> Add Size
                                </button>
                            </div>

                            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex gap-3 items-center">
                                        <input
                                            {...register(`sizes.${index}.size`, {
                                                required: "Size is required",
                                            })}
                                            placeholder="Size (S, M, XL)"
                                            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />

                                        <input
                                            type="number"
                                            {...register(`sizes.${index}.stock`, {
                                                required: "Stock is required",
                                            })}
                                            placeholder="Stock"
                                            className="w-28 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            disabled={fields.length === 1}
                                            className="p-2 rounded-xl hover:bg-red-50 disabled:opacity-50"
                                        >
                                            <Trash2 className="w-5 h-5 text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="md:col-span-2 border-t border-slate-100 pt-6 mt-2 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={handleDiscard}
                            className="px-6 py-3 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 transition-colors"
                        >
                            Discard
                        </button>

                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-95"
                        >
                            Publish Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;