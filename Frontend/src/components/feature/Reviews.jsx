import { BadgeCheck } from "lucide-react";

function Reviews() {
    return (
        <div className="w-full">
            {/*Rating and reviews  */}
            <h2 className="text-2xl mt-2 font-semibold">Rating and reviews</h2>
            <h2 className="text-2xl mt-2 font-semibold">avg rating</h2>
            <p className="flex items-center">based on N rating by <BadgeCheck size={16} className="ml-1 mr-0.5" />Verified Buyers</p>
            {/* Review Images */}
            <div>

            </div>
        </div>
    )
}
export default Reviews;