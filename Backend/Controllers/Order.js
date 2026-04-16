async function createOrder() {
    try {
        const userId = req.userId;
        const { id: productId } = req.params;

    }
    catch (error) {
        console.log(error.message);
        return res.statu(500).send({ mes: 'internal server error' });
    }
}

module.exports = { createOrder };