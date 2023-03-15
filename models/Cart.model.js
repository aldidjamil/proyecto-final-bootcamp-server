const { Schema, model } = require("mongoose");
const Product = require("./Product.model")

const cartSchema = new Schema(
    {

        buy: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },

            quantity: {
                type: Number,
                default: 1
            },

            price: {
                type: Number,
                default: 0
            },

        }],

        totalPrice: { type: Number },


    },
    {
        timestamps: true
    }
);

cartSchema.pre('save', async function () {
    const cart = this;
    let totalPrice = 0;

    console.log("???????", cart)

    for (const item of cart.buy) {

        const product = await Product.findById(item.product);
        const price = product.price * item.quantity;
        item.price = price;
        totalPrice += price;
    }

    cart.totalPrice = totalPrice;
});

cartSchema.methods.updatePrices = async function () {
    const cart = this;
    let totalPrice = 0;

    for (const item of cart.buy) {
        const product = await Product.findById(item.product);
        const price = product.price * item.quantity;
        console.log(product.price)
        item.price = price;
        totalPrice += price;
    }

    cart.totalPrice = totalPrice;

    return cart
};


const Cart = model("Cart", cartSchema)

module.exports = Cart