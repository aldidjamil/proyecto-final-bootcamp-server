const { Schema, model } = require("mongoose");

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'El nombre es obligatorio.'],
            unique: true
        },
        description: {
            type: String,
            minlength: [5, 'La descripción debe tener min. 5 caracteres.'],
            required: [true, 'La descripción es obligatoria.'],
        },
        format: { //Aqui un enum con 125 y 200 gr
            type: Number,
            min: [60, 'Sólo a partir de 100 gramos.'],
            required: [true, 'El formato es obligatoria.'],
        },
        format: {
            type: String,
            enum: ['125', '200'],
            default: '125'
        },
        stock: {
            type: Number,
            required: [true, 'La cantidad de producto es obligatoria'],
        },
        imageUrl: {
            type: String,
            default: 'https://beanbased.es/wp-content/uploads/2022/04/cropped-image0.jpeg',
            set: value => value === '' ? 'https://beanbased.es/wp-content/uploads/2022/04/cropped-image0.jpeg' : value,
            required: [true, 'La imagen es obligatoria.'],
        },
        price: {
            type: Number,
            required: [true, 'El precio por unidad es obligatoria'],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const Product = model("Product", productSchema)

module.exports = Product