const reviewModel = require('./Review');

// Create Review
async function createReview(req, res) {
    try {
        const { id: product } = req.params;
        const user = req.userId;
        const { message, rating } = req.body;

        // Validation
        if (!product || !user) {
            return res.status(400).json({ msg: "Product or user missing" });
        }

        if (!message || !rating) {
            return res.status(400).json({ msg: "Message and rating are required" });
        }

        const review = await reviewModel.create({
            message,
            rating,
            user,
            product
        });

        return res.status(201).json({ review });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
}

// Delete Reviews
async function deleteReview(req, res) {
    try {
        const { id: product } = req.params;
        const review = await reviewModel.findOneAndDelete({ user: req.userId, product });

        if (!review) {
            return res.status(404).json({ msg: "Review not found or unauthorized" });
        }

        return res.status(200).json({
            msg: "Review deleted successfully",
            review
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ mes: 'Server error', error: error.message });
    }

}

// Get Reviews 
async function getProductReviews(req, res) {
    try {
        const { id: product } = req.params;
        const reviews = await reviewModel.find({ product }).populate('user').populate('product');

        return res.status(200).json({ reviews });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
}

async function updateReview(req, res) {
    try {

    } catch (error) {
        console.log(error.message);
    }
}

async function getProductRating(req, res) {
    try {

    } catch (error) {
        console.log(error.message);
    }

}

async function getReviews(req, res) {
    try {
        let reviews = await reviewModel.find();
        return res.status(200).send({ reviews });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ mes: 'server error' });
    }

}

module.exports = {
    createReview, getProductReviews, getReviews,
    deleteReview, updateReview,
    getProductRating
};